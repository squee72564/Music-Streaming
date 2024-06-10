// AlbumPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchContent } from "../utils/api";
import { API_URLS } from "../utils/apiConfig";

const AlbumPage = () => {
  const [albumInfo, setAlbumInfo] = useState(null);
  const [error, setError] = useState(false);
  const { albumId } = useParams();
  const apiUrl = `${API_URLS.ALBUMS}${albumId}/`;

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        await fetchContent(apiUrl, setAlbumInfo, null, null);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchAlbumData();
  }, [apiUrl]);

  if (error) {
    return <h1>Album not found.</h1>;
  }

  if (albumInfo === null) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div className="flex items-center justify-center mx-4 my-8">
      <div className="flex flex-col items-center bg-gray-400 p-8 rounded-lg w-full max-w-xl gap-1">
        <h1 className="text-xl font-bold">{albumInfo.album_title}</h1>
        <img
          src={albumInfo.image}
          className="w-48 h-48"
          alt={albumInfo.album_title}
        ></img>
        <h2 className="font-medium">
          {"Label: " + albumInfo.label.label_name}
        </h2>
        <p className="font-medium">
          {"Genres: " +
            albumInfo.genres
              .map((genre) => {
                return genre.genre_name;
              })
              .join(", ")}
        </p>
        <select
          onChange={(event) => {
            const songFile = event.target.value;
            const audioPlayer = document.getElementById("audioPlayer");
            audioPlayer.src = songFile;
            audioPlayer.play();
          }}
          className="text-center p-1"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Select a song
          </option>
          {albumInfo.songs.map((song) => {
            const artists = song.artists
              .map((artist) => artist.artist_name)
              .join(", ");
            const songTitle = song.song_title;
            return (
              <option key={song.id} value={song.song_file}>
                {artists} - {songTitle}
              </option>
            );
          })}
        </select>
        <audio
          id="audioPlayer"
          className="w-full bg-gray-200 rounded-lg p-4 shadow-md"
          autoPlay={false}
          controls
        ></audio>
      </div>
    </div>
  );
};

export default AlbumPage;
