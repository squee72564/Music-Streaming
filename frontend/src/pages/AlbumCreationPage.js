// AlbumCreationPage.js
import React, {useEffect, useState} from "react";
import { getCookie } from "../services/helpers";
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "../components/Checkbox";
import { fetchPaginatedContent } from "../services/api"

const AlbumCreationPage = () => {
    const navigate = useNavigate();

    const [genreCheckbox, setGenreCheckbox] = useState([]);
    const [artistCheckbox, setArtistCheckbox] = useState([]);
    
    const [labels, setLabels] = useState(null);
    const [artists, setArtists] = useState(null);
    const [genres, setGenres] = useState(null);
    
    const [albumData,  setAlbumData] = useState({
        album_title: "",
        image: null,
        label: {
            label_name: "",
        },
        genres: [],
        songs: [
            {
                song_title: "",
                artists: [],
                song_file: null,
            },
        ],
    });

    useEffect(() => {    
        const fetchAllData = async () => {
          try {
                await Promise.all([
                fetchPaginatedContent(
                    'http://127.0.0.1:8000/music/api/labels/?limit=100',
                    setLabels,
                    null,
                    null
                ),
                fetchPaginatedContent(
                    'http://127.0.0.1:8000/music/api/artists/?limit=100',
                    setArtists,
                    null,
                    null
                ),
                fetchPaginatedContent(
                    'http://127.0.0.1:8000/music/api/genres/?limit=100',
                    setGenres,
                    null,
                    null
                ),
                ]).then(() => {
                    if (genres)
                        setGenreCheckbox(new Array(genres.length).fill(false));
                    if (artists)
                        setArtistCheckbox(new Array(artists.length).fill(false));
                })

          } catch (error) {
            console.error("Error fetching data", error);
          }
        }

        fetchAllData();
        
    }, []);

    const handleTitleChange = (event) => {
        const {value} = event.target;

        setAlbumData({
            ...albumData,
            album_title: value,
        });
    };

    const handleImageChange = (event) => {
        const {files} = event.target;

        setAlbumData({
            ...albumData,
            image: files[0],
        });
    };

    const handleLabelChange = (event) => {
        const {value} = event.target;

        if (value == "") return;

        setAlbumData({
            ...albumData,
            label: {
                label_name: value,
            },
        });
    }

    const handleGenreChange = (indices, label) => {
        const [checkBoxIndex] = indices;

        const updatedCheckboxState = [...genreCheckbox];
        updatedCheckboxState[checkBoxIndex] = !updatedCheckboxState[checkBoxIndex];
        setGenreCheckbox(updatedCheckboxState);

        if (updatedCheckboxState[checkBoxIndex]) {
            setAlbumData({
                ...albumData,
                genres: [
                    ...albumData.genres,
                    { "genre_name": label },
                ]
            });
        } else {
            setAlbumData({
                ...albumData,
                genres: albumData.genres.filter(genre => genre.genre_name !== label)
            });
        }
    }

    const handleSongChange  = (event, index) => {
        const {value} = event.target;
        
        let updatedSongData = albumData.songs;

        updatedSongData[index].song_title = value;

        setAlbumData({
            ...albumData,
            songs: updatedSongData,
        });

    }

    const handleArtistChange  = (indices, label) => {
        const [checkBoxIndex, songIndex] = indices;

        const updatedCheckboxState = [...artistCheckbox];
        updatedCheckboxState[checkBoxIndex] = !updatedCheckboxState[checkBoxIndex];
        setArtistCheckbox(updatedCheckboxState);

        setAlbumData(prevAlbumData => {
            const updatedSongData = [...prevAlbumData.songs];

            if (updatedCheckboxState[checkBoxIndex]) {
                updatedSongData[songIndex] = {
                    ...updatedSongData[songIndex],
                    artists : [
                        ...updatedSongData[songIndex].artists,
                        { "artist_name": label }
                    ]
                };
            } else {
                updatedSongData[songIndex] = {
                    ...updatedSongData[songIndex],
                    artists : updatedSongData[songIndex].artists.filter(artist => artist.artist_name !== label)
                };
            }

            return {
                ...prevAlbumData,
                songs: updatedSongData,
            };
        });
    }

    const addNewSongData = () => {
        setAlbumData({
            ...albumData,
            songs: [...albumData.songs, {song_title: "", artists: [], song_file: null}],
        });
    }

    const removeLastSongData = () => {
        if (albumData.songs.length > 1) {
            setAlbumData({
                ...albumData,
                songs: albumData.songs.slice(0, -1)
            });
        }
    }

    const handleFileUpload = (event, index) => {
        const {files} = event.target;
        
        let updatedSongData = albumData.songs;

        updatedSongData[index] = {
            ...updatedSongData[index],
            song_file : files[0],
        }

        setAlbumData({
            ...albumData,
            songs: updatedSongData,
        });
    }

    const validateSubmission = async (event) => {
        event.preventDefault();
        
        const { album_title, label, image, genres, songs } = albumData;

        if (album_title      === "" ||
            label.label_name === "" ||
            genres.length    === 0  ||
            songs.length     === 0  ||
            image            === null )
        {
            return;
        }

        if (!genres.every( genre => genre.genre_name !== "") ||
            !songs.every( song => 
                song.song_title !== ""   &&
                song.song_file  !== null &&
                song.artists.length > 0  &&
                song.artists.every(artist => artist.artist_name !== "")
            ))
        {
            return;
        }

        await handleSubmit();
    }

    const handleSubmit = async () => {
        try {
            const csrfToken = getCookie("csrftoken");
            const formData = new FormData();

            formData.append('album_title', albumData.album_title);
            formData.append('image', albumData.image);
            formData.append('label.label_name', albumData.label.label_name);

            albumData.genres.forEach((genre, index) => {
                formData.append(`genres[${index}]`, JSON.stringify(genre));
            });

            albumData.songs.forEach((song, index) => {
                const songFile = song.song_file;
                delete song.song_file;
                formData.append(`songs[${index}]`, JSON.stringify(song));
                formData.append(`song_file[${index}]`, songFile);
            });

            const response = await fetch('http://127.0.0.1:8000/music/api/albums/create/', {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to submit data to server");
            }

            navigate("/music/collection/");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="flex flex-col rounded bg-gray-300 justify-center items-center space-y-8 w-4/6 ml-auto mr-auto mt-20 p-8" onSubmit={validateSubmission} encType="multipart/form-data">
            <div className="flex flex-row justify-center items-center space-x-8">
                {/** Album Input */}
                <label className="flex flex-col">
                    Album title:
                    <input type="text" name="album_title" value={albumData.album_title} onChange={handleTitleChange} />
                </label>
                <label className="flex flex-col">
                    Album Image:
                    <input type="file" name="image" onChange={handleImageChange} accept="image/*"/>
                </label>
            </div>
            <div className="flex flex-row justify-center items-center space-x-12 ">
                {/** Label Input */}
                <label className="flex flex-col">
                    Select a label:
                    <select onChange={handleLabelChange}>
                        <option value="">Select Label</option>
                        {labels && labels.map((label, index) => {
                            return <option key={index} value={label.label_name}>{label.label_name}</option>
                        })}
                    </select>
                </label>
                {/** Genres Input */}
                <div>
                    Check to add a genre:
                    <div className="flex flex-col items-center bg-white overflow-y-auto h-12">
                        {genres && genres.map((genre, index) => (
                            <Checkbox key={index} label={genre.genre_name} indices={[index]} value={genreCheckbox[index]} onChange={handleGenreChange}/>
                        ))}
                    </div>
                </div>
            </div>
            {/** Songs Input: Each song has a title, contributing artist(s), and a file*/}
            {albumData.songs.map((song, index) => (
                <div key={index} className="flex flex-row justify-center items-center space-x-8">
                    <label className="flex flex-col">
                        Song Title:
                        <input type="text" name="song_title" value={song.song_title} onChange={(event) => handleSongChange(event, index)}/>
                    </label>
                    <div>
                        Check to add a artist:
                        <div className="flex flex-col items-center bg-white overflow-y-auto h-12">
                            {artists && artists.map((artist, artist_index) => (
                                <Checkbox key={artist_index} label={artist.artist_name} indices={[artist_index, index]} value={artistCheckbox[artist_index]} onChange={handleArtistChange}/>
                            ))}
                        </div>
                    </div>
                    <label className="flex flex-col">
                        Upload Song File:
                        <input type="file" onChange={(event) => handleFileUpload(event, index)} accept="audio/*"/>
                    </label>
                </div>
            ))}
            <div className="flex flex-row justify-center space-x-8">
                <button className="rounded bg-gray-400 p-2" type="button" onClick={addNewSongData}>
                    Add New Song
                </button>
                <button className="rounded bg-gray-400 p-2" type="button" onClick={removeLastSongData}>
                    Remove Last Song
                </button>
                <button className="rounded bg-gray-400 p-2" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default AlbumCreationPage;