// ProfilepPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MusicCollection = () => {

  const navigate = useNavigate();
  const username = document.getElementById('root').getAttribute('data-username');
  const [albums, setAlbums] = useState(null);
  const [labels, setLabels] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchAlbums = async (url) => {
    try {
      const albumResponse = await fetch(url);
      if (albumResponse.ok) {
        const albumData = await albumResponse.json();
        setAlbums(albumData.results);
        setNextPage(albumData.next);
        setPrevPage(albumData.previous);
      } else {
        console.error("Albums API request failed.");
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const labelResponse = await fetch("http://127.0.0.1:8000/music/api/labels/");
        if (labelResponse.ok) {
          const labelData = await labelResponse.json();
          setLabels(labelData.results);
        } else {
          console.error("Labels API request failed.");
        }
      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    };
  
    fetchAlbums('http://127.0.0.1:8000/music/api/albums/');
    fetchLabels();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`${albumId}`);
  };

  const fetchPageData = (url) => {
    if (url) {
      fetchAlbums(url);
    }
  }

  return (
    <div className='rounded bg-gray-400 flex flex-col justify-center items-center m-5'>
      <h1 className='text-xl font-bold m-5'>Welcome, {username}!</h1>
      <div className='rounded-b bg-gray-200 content-stretch text-center space-y-10 w-full'>
        <h1 className='text-xl font-bold m-3'>Your Albums</h1>
        <div className='space-x-10'>
          <button className='rounded bg-gray-400 px-4' onClick={() => fetchPageData(prevPage)}>Prev</button>
          <button className='rounded bg-gray-400 px-4' onClick={() => fetchPageData(nextPage)}>Next</button>
        </div>
        <div id='Albums' className='flex justify-center space-x-10 m-5'>
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
