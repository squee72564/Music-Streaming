// ProfilepPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MusicCollection = () => {

  const navigate = useNavigate();
  const username = document.getElementById('root').getAttribute('data-username');
  const [albums, setAlbums] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumResponse, labelResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/music/api/albums/"),
          fetch("http://127.0.0.1:8000/music/api/labels/")
        ]);
  
        if (albumResponse.ok && labelResponse.ok) {
          const albumData = await albumResponse.json();
          const labelData = await labelResponse.json();
  
          setAlbums(albumData);
          setLabels(labelData);
        
        } else {
          console.error("One or more API requests failed.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`${albumId}`);
  };

  return (
    <div className='rounded bg-gray-400 flex flex-col justify-center items-center m-5'>
      <h1 className='text-xl font-bold m-5'>Welcome, {username}!</h1>
      <div className='rounded-b bg-gray-200 content-stretch text-center space-y-10 w-full'>
        <h1 className='text-xl font-bold m-3'>Your Albums</h1>
        <div id='Albums' className='flex space-x-10 m-5'>
          {albums && albums.map((album) => (
            <div key={album.id} onClick={()=>handleAlbumClick(album.id)} style={{ cursor: 'pointer' }}>
              <h2>{album.album_title}</h2>
              <img src={album.image} className="w-32 h-32" alt={album.album_title}></img>
              <p>{album.genre}</p>
            </div>
          ))}
        </div>
        <h1 className='text-xl font-bold m-3'>Your Labels</h1>
        <div id='Labels' className='flex space-x-10 m-5'>
          {labels && labels.map((label) => (
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
