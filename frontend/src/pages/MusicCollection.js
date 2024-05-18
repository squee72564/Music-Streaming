// ProfilepPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MusicCollection = () => {

  const username = document.getElementById('root').getAttribute('data-username');
  const [albums, setAlbums] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumResponse, songResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/music/api/albums/"),
          fetch("http://127.0.0.1:8000/music/api/labels/")
        ]);
  
        if (albumResponse.ok && songResponse.ok) {
          const albumData = await albumResponse.json();
          const songData = await songResponse.json();
  
          setAlbums(albumData);
          setLabels(songData);
  
          console.log("Album Data:", albumData);
          console.log("Song Data:", songData);
        } else {
          console.error("One or more API requests failed.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='rounded bg-gray-400 flex flex-col justify-center items-center m-5'>
      <h1 className='text-xl font-bold m-5'>Welcome, {username}!</h1>

      <div className='rounded-b bg-gray-200 content-stretch text-center space-y-10 w-full'>
        <h1 className='text-xl font-bold m-3'>Your Albums</h1>
        <div id='Albums' className='flex space-x-10 m-5'>
          {albums.map((album) => (
            <div key={album.id}>
              <h2>{album.album_title}</h2>
              <img src={album.image} className="w-32 h-32"></img>
              <p>{album.genre}</p>
            </div>
          ))}
        </div>
        <h1 className='text-xl font-bold m-3'>Your Labels</h1>
        <div id='Labels' className='flex space-x-10 m-5'>
          {labels.map((label) => (
            <div key={label.id}>
              <h2 className='font-bold m-3' >{label.label_name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicCollection;
