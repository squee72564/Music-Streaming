// AlbumCreationPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Checkbox } from "../components/Checkbox";
import SingleFieldModal from "../components/SingleFieldModal";

import { fetchPaginatedContent } from "../utils/api";
import { API_URLS } from "../utils/apiConfig";
import { getCookie } from "../utils/helpers";

const AlbumCreationPage = () => {
  const navigate = useNavigate();

  const [genreCheckbox, setGenreCheckbox] = useState([]);
  const [artistCheckbox, setArtistCheckbox] = useState([]);

  const [labels, setLabels] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const [albumData, setAlbumData] = useState({
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
            `${API_URLS.LABELS}?limit=100`,
            setLabels,
            null,
            null
          ),
          fetchPaginatedContent(
            `${API_URLS.ARTISTS}?limit=100`,
            setArtists,
            null,
            null
          ),
          fetchPaginatedContent(
            `${API_URLS.GENRES}?limit=100`,
            setGenres,
            null,
            null
          ),
        ]).then(() => {
          if (genres) setGenreCheckbox(new Array(genres.length).fill(false));
          if (artists) setArtistCheckbox(new Array(artists.length).fill(false));
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllData();
  }, []);

  const handleLabelUpdate = (newLabel) => {
    setLabels([...labels, { label_name: newLabel }]);
  };

  const handleArtistUpdate = (newArtist) => {
    setArtists([...artists, { artist_name: newArtist }]);
  };

  const handleGenreUpdate = (newGenre) => {
    setGenres([...genres, { genre_name: newGenre }]);
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;

    setAlbumData({
      ...albumData,
      album_title: value,
    });
  };

  const handleImageChange = (event) => {
    const { files } = event.target;

    setAlbumData({
      ...albumData,
      image: files[0],
    });
  };

  const handleLabelChange = (event) => {
    const { value } = event.target;

    if (value == "") return;

    setAlbumData({
      ...albumData,
      label: {
        label_name: value,
      },
    });
  };

  const handleGenreChange = (indices, label) => {
    const [checkBoxIndex] = indices;

    const updatedCheckboxState = [...genreCheckbox];
    updatedCheckboxState[checkBoxIndex] = !updatedCheckboxState[checkBoxIndex];
    setGenreCheckbox(updatedCheckboxState);

    if (updatedCheckboxState[checkBoxIndex]) {
      setAlbumData({
        ...albumData,
        genres: [...albumData.genres, { genre_name: label }],
      });
    } else {
      setAlbumData({
        ...albumData,
        genres: albumData.genres.filter((genre) => genre.genre_name !== label),
      });
    }
  };

  const handleSongChange = (event, index) => {
    const { value } = event.target;

    let updatedSongData = albumData.songs;

    updatedSongData[index].song_title = value;

    setAlbumData({
      ...albumData,
      songs: updatedSongData,
    });
  };

  const handleArtistChange = (indices, label) => {
    const [checkBoxIndex, songIndex] = indices;

    const updatedCheckboxState = [...artistCheckbox];
    updatedCheckboxState[checkBoxIndex] = !updatedCheckboxState[checkBoxIndex];
    setArtistCheckbox(updatedCheckboxState);

    setAlbumData((prevAlbumData) => {
      const updatedSongData = [...prevAlbumData.songs];

      if (updatedCheckboxState[checkBoxIndex]) {
        updatedSongData[songIndex] = {
          ...updatedSongData[songIndex],
          artists: [
            ...updatedSongData[songIndex].artists,
            { artist_name: label },
          ],
        };
      } else {
        updatedSongData[songIndex] = {
          ...updatedSongData[songIndex],
          artists: updatedSongData[songIndex].artists.filter(
            (artist) => artist.artist_name !== label
          ),
        };
      }

      return {
        ...prevAlbumData,
        songs: updatedSongData,
      };
    });
  };

  const addNewSongData = () => {
    setAlbumData({
      ...albumData,
      songs: [
        ...albumData.songs,
        { song_title: "", artists: [], song_file: null },
      ],
    });
  };

  const removeLastSongData = () => {
    if (albumData.songs.length > 1) {
      setAlbumData({
        ...albumData,
        songs: albumData.songs.slice(0, -1),
      });
    }
  };

  const handleFileUpload = (event, index) => {
    const { files } = event.target;

    let updatedSongData = albumData.songs;

    updatedSongData[index] = {
      ...updatedSongData[index],
      song_file: files[0],
    };

    setAlbumData({
      ...albumData,
      songs: updatedSongData,
    });
  };

  const validateSubmission = async (event) => {
    event.preventDefault();

    const { album_title, label, image, genres, songs } = albumData;

    if (
      album_title === "" ||
      label.label_name === "" ||
      genres.length === 0 ||
      songs.length === 0 ||
      image === null
    ) {
      return;
    }

    if (
      !genres.every((genre) => genre.genre_name !== "") ||
      !songs.every(
        (song) =>
          song.song_title !== "" &&
          song.song_file !== null &&
          song.artists.length > 0 &&
          song.artists.every((artist) => artist.artist_name !== "")
      )
    ) {
      return;
    }

    await handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const csrfToken = getCookie("csrftoken");
      const formData = new FormData();

      formData.append("album_title", albumData.album_title);
      formData.append("image", albumData.image);
      formData.append("label.label_name", albumData.label.label_name);

      albumData.genres.forEach((genre, index) => {
        formData.append(`genres[${index}]`, JSON.stringify(genre));
      });

      albumData.songs.forEach((song, index) => {
        const songFile = song.song_file;
        delete song.song_file;
        formData.append(`songs[${index}]`, JSON.stringify(song));
        formData.append(`song_file[${index}]`, songFile);
      });

      const response = await fetch(`${API_URLS.ALBUMS}create/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} : ${response.statusText}`);
      }

      navigate("/music/collection/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center m-5 space-x-8">
        <SingleFieldModal modelName={"Label"} onUpdate={handleLabelUpdate} />
        <SingleFieldModal modelName={"Artist"} onUpdate={handleArtistUpdate} />
        <SingleFieldModal modelName={"Genre"} onUpdate={handleGenreUpdate} />
      </div>
      <form
        className="flex flex-col rounded bg-gray-400 justify-center items-center space-y-8 w-4/6 ml-auto mr-auto p-8"
        onSubmit={validateSubmission}
        encType="multipart/form-data"
      >
        <div className="flex flex-row justify-center items-center space-x-8">
          {/** Album Input */}
          <label className="flex flex-col">
            <span className="font-bold">Album title:</span>
            <input
              type="text"
              name="album_title"
              value={albumData.album_title}
              onChange={handleTitleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="font-bold">Album Image:</span>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        </div>
        <div className="flex flex-row justify-center items-center space-x-12 ">
          {/** Label Input */}
          <label className="flex flex-col">
            <span className="font-bold">Select a label:</span>
            <select onChange={handleLabelChange}>
              <option value="">Select Label</option>
              {labels &&
                labels.map((label, index) => {
                  return (
                    <option key={index} value={label.label_name}>
                      {label.label_name}
                    </option>
                  );
                })}
            </select>
          </label>
          {/** Genres Input */}
          <div>
            <span className="font-bold">Check to add a genre:</span>
            <div className="flex flex-col items-left bg-white overflow-y-auto px-3 h-16">
              {genres &&
                genres.map((genre, index) => (
                  <Checkbox
                    key={index}
                    label={genre.genre_name}
                    indices={[index]}
                    value={genreCheckbox[index]}
                    onChange={handleGenreChange}
                  />
                ))}
            </div>
          </div>
        </div>
        {/** Songs Input: Each song has a title, contributing artist(s), and a file*/}
        <div className="flex flex-col rounded items-center bg-gray-300 overflow-y-auto px-6 h-40">
          {albumData.songs.map((song, index) => (
            <div
              key={index}
              className="flex flex-row justify-center items-center space-x-8 py-6"
            >
              <label className="flex flex-col">
                <span className="font-bold">{`Song ${index + 1} Title:`}</span>
                <input
                  type="text"
                  name="song_title"
                  value={song.song_title}
                  onChange={(event) => handleSongChange(event, index)}
                />
              </label>
              <div>
                <span className="font-bold">Check to add a artist:</span>
                <div className="flex flex-col items-left bg-white overflow-y-auto px-3 h-16">
                  {artists &&
                    artists.map((artist, artist_index) => (
                      <Checkbox
                        key={artist_index}
                        label={artist.artist_name}
                        indices={[artist_index, index]}
                        value={artistCheckbox[artist_index]}
                        onChange={handleArtistChange}
                      />
                    ))}
                </div>
              </div>
              <label className="flex flex-col">
                <span className="font-bold">{`Upload Song ${
                  index + 1
                } File:`}</span>
                <input
                  type="file"
                  onChange={(event) => handleFileUpload(event, index)}
                  accept="audio/*"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center space-x-8">
          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={addNewSongData}
          >
            Add New Song
          </button>
          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={removeLastSongData}
          >
            Remove Last Song
          </button>
          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AlbumCreationPage;
