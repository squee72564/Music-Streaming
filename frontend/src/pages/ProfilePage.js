// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [labels, setLabels] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'http://localhost:8000/music/api/user/1/albums/',
          'http://localhost:8000/music/api/user/1/songs/',
          'http://localhost:8000/music/api/user/1/labels/',
          'http://localhost:8000/music/api/user/1/artists/'
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));

        setAlbums(new Map(data[0].map(album => [album.id, album])));
        setSongs(new Map(data[1].map(song => [song.id, song])));
        setLabels(new Map(data[2].map(label => [label.id, label])));
        setArtists(new Map(data[3].map(artist => [artist.id, artist])));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row bg-white justify-center m-10">
      <div id="left-panel" className="w-3/12">
        
      </div>
      <div id="right-panel" className="w-9/12 text-center border-2 border-black">

        <h1 class="text-3xl my-4">Songs</h1>
        <div id="song-panel" className="flex flex-row text-center border-2">
          {Array.from(songs.values()).map(song => (
            <div key={song.id} className="flex-1">
              <p>{song.song_title}</p>
              <p>{song.duration}</p>
              <p>Artists: {song.artists.map(artist => artist.artist_name).join(', ')}</p>
            </div>
          ))}
        </div>
        <h1 class="text-3xl  my-4">Albums</h1>
        <div id="album-panel" className="flex flex-row border-2">
          {Array.from(albums.values()).map(album => (
            <div key={album.id} className="flex-1 flex flex-col justify-center items-center">
              <img src={album.image} alt={album.name} className="w-24 h-24" ></img>
              <p>{album.album_title}</p>
              <p>Genre: {album.genre}</p>
              <p>Label: {album.label.label_name}</p>
            </div>
          ))}
        </div>
        <h1 class="text-3xl my-4">Artists</h1>
        <div id="artist-panel" className="flex flex-row border-2">
          {Array.from(artists.values()).map(artist => (
            <div key={artist.id} className="flex-1 text-center">
              <p>{artist.artist_name}</p>
            </div>
          ))}
        </div>
        <h1 class="text-3xl my-4">Music Labels</h1>
        <div id="label-panel" className="flex flex-row text-center border-2">
          {Array.from(labels.values()).map(label => (
            <div key={label.id} className="flex-1 text-center">
              <p>{label.label_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;