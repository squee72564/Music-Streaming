// AlbumPage.js
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
  const [albumInfo, setAlbumInfo] = useState(null);
  const { albumId } = useParams();
  const apiUrl = `http://127.0.0.1:8000/music/api/albums/${albumId}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await fetch(apiUrl);

        if (albumResponse.ok) {
          const albumData = await albumResponse.json();

          setAlbumInfo(albumData);

        } else {
        console.error("Album API requests failed.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      
    fetchData();
  }, [apiUrl]);

  if (!albumInfo) {
    return (
      <h1>LOADING...</h1>
    );
  }

  return (
    <div className="flex items-center justify-center mx-4 my-8">
      <div className="flex flex-col items-center bg-gray-400 p-8 rounded-lg w-full max-w-xl gap-1">
        <h1 className="text-xl font-bold">{albumInfo.album_title}</h1>
        <img src={albumInfo.image} className="w-48 h-48" alt={albumInfo.album_title}></img>
        <h2>Label: {albumInfo.label.label_name}</h2>
        <p>Genre: {albumInfo.genre}</p>
        <select
          onChange={(event) => {
            const songFile = event.target.value;
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = songFile;
            audioPlayer.play();
          }}
          className="text-center"
          defaultValue=""
        >
          <option value="" disabled hidden>Select a song</option>
          {albumInfo.songs.map((song) => {
            const artists = song.artists.map((artist) => artist.artist_name).join(', ');
            const songTitle = song.song_title;
            return (
              <option key={song.id} value={song.song_file}>{artists} - {songTitle}</option>
            );
          })}
        </select>
        <audio id="audioPlayer" className="w-full bg-gray-200 rounded-lg p-4 shadow-md" autoPlay={false} controls ></audio>
      </div>
    </div>
  );
};

export default AlbumPage;