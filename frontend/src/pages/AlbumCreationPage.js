// AlbumCreationPage.js
import React, {useEffect, useState} from "react";
import { getCookie } from "../services/helpers";
import { Navigate } from "react-router-dom";

const AlbumCreationPage = () => {
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
        setAlbumData({
            ...albumData,
            label: {
                label_name: value,
            },
        });
    }

    const handleGenreChange = (event) => {
        const {value} = event.target;

        if (value === "") return;

        setAlbumData({
            ...albumData,
            genres: [
                ...albumData.genres,
                {"genre_name": value},
            ].filter((value, index, array) => array.indexOf(value) === index),
        });
    }

    const handleSongChange  = (event, index) => {
        const {value} = event.target;

        if (value === "") return;

        let updatedSongData = albumData.songs;

        updatedSongData[index].song_title = value;

        setAlbumData({
            ...albumData,
            songs: updatedSongData,
        });

    }

    const handleArtistChange  = (event, index) => {
        const {value} = event.target;

        if (value === "") return;
        
        let updatedSongData = albumData.songs;

        updatedSongData[index] = {
            ...updatedSongData[index],
            artists : [
                ...updatedSongData[index].artists,
                {"artist_name": value}
            ].filter((value, index, array) => array.indexOf(value) === index),
        };

        setAlbumData({
            ...albumData,
            songs: updatedSongData,
        });
    }

    const addNewSongData = () => {
        setAlbumData({
            ...albumData,
            songs: [...albumData.songs, {song_title: "", artists: [], song_file: null}],
        });
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
        if (albumData.album_title === "") return;

        if (albumData.label.label_name === "") return;

        if (albumData.genres.length === 0 ||
            albumData.genres.some( (genre) => genre.genre_name === "" )
        ) return;
        
        if (albumData.songs.length === 0 ||
            albumData.songs.some( (song) => (
                song.song_title === ""    ||
                song.artists.length === 0 ||
                song.artists.some( (artist) => artist.artist_name === "")
            ))
        ) return;

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
                console.log(genre);
                formData.append(`genres[${index}]`, JSON.stringify(genre));
            });

            albumData.songs.forEach((song, index) => {
                const songFile = song.song_file;
                delete song.song_file;
                console.log(songFile);
                formData.append(`songs[${index}]`, JSON.stringify(song));
                formData.append(`song_file[${index}]`, songFile);
            });

            await fetch('http://127.0.0.1:8000/music/api/albums/create/', {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                body: formData,
            }).then( (data) => console.log(data));

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={validateSubmission} encType="multipart/form-data">
            {/** Album Input */}
            <label>
                Album title:
                <input type="text" name="album_title" value={albumData.album_title} onChange={handleTitleChange} />
            </label>
            <label>
                Album Image:
                <input type="file" name="image" onChange={(event) => handleImageChange(event)} accept="image/*"/>
            </label>
            {/** Label Input */}
            <label>
            Select a label:
                <select onChange={handleLabelChange}>
                    <option value="">Select Label</option>
                    <option value="Test Label">Test Label</option>
                    {/*Map over backend Labels or create label to then select?*/}
                </select>
                <span>{albumData.label.label_name}</span>
            </label>
            {/** Genres Input */}
            <label>
                Select to add a genre:
                <select onChange={handleGenreChange}>
                    <option value="">Select Genre</option>
                    <option value="Test Genre">Test Genre</option>
                    <option value="Test Genre 2">Test Genre 2</option>
                    {/*Map over backend Genres or create genre to then select?*/}
                </select>
                {albumData.genres.map((genre, index) => (
                    <span key={index}>{genre.genre_name}</span>
                ))}
            </label>
            {/** Songs Input: Each song has a title, contributing artist(s), and a file*/}
            {albumData.songs.map((song, index) => (
                <div key={index}>
                    <label>
                        Song Title:
                        <input type="text" name="song_title" value={song.song_title} onChange={(event) => handleSongChange(event, index)}/>
                    </label>
                    <label>
                        Select to add an artist:
                        <select onChange={(event) => handleArtistChange(event, index)}>
                            <option value="">Select Artist</option>
                            <option value="Example Artist">Example Artist</option>
                            <option value="Example Artist 2">Example Artist 2</option>
                            {/*Map over backend Artists or create artist to then select?*/}
                        </select>
                        {albumData.songs[index].artists.map((artist, artist_idx) => (
                            <span key={artist_idx}>{artist.artist_name}</span>
                        ))}
                    </label>
                    <label>
                        Upload Song File:
                        <input type="file" name={`${song.song_file ? song.song_file : ""}`} onChange={(event) => handleFileUpload(event, index)} accept="audio/*"/>
                    </label>
                </div>
            ))}
            <button type="button" onClick={addNewSongData}>
                Add New Song
            </button>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AlbumCreationPage;