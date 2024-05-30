// ProfilepPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPaginatedContent } from '../services/api';

const MusicCollection = () => {

  const navigate = useNavigate();
  const username = document.getElementById('root').getAttribute('data-username');
  const [albums, setAlbums] = useState(null);
  const [labels, setLabels] = useState(null);
  const [genres, setGenres] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {    
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchPaginatedContent(
            'http://127.0.0.1:8000/music/api/albums/',
            setAlbums,
            setNextPage,
            setPrevPage,
          ),
          fetchPaginatedContent(
            'http://127.0.0.1:8000/music/api/labels/',
            setLabels,
            null,
            null
          ),
          fetchPaginatedContent(
            'http://127.0.0.1:8000/music/api/genres/',
            setGenres,
            null,
            null
          ),
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchAllData();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/music/collection/${albumId}`);
  };

  const fetchAlbumPageData = (url) => {
    if (url) {
      fetchPaginatedContent(
        url,
        setAlbums,
        setNextPage,
        setPrevPage,
      );
    }
  }

  return (
    <div className='flex flex-col justify-center m-5'>
      <h1 className='text-xl font-bold m-5'>Welcome, {username}!</h1>
      <div className='text-center space-y-8'>
        <h1 className='text-xl font-bold m-3'>Your Albums</h1>
        <div className='space-x-10'>
          <button className='rounded bg-gray-400 px-4' onClick={() => fetchPageData(prevPage)}>Prev</button>
          <button className='rounded bg-gray-400 px-4' onClick={() => fetchPageData(nextPage)}>Next</button>
        </div>
        <div id='Albums' className='flex justify-center overflow-x-auto space-x-10 m-5 min-h-48'>
          {albums && albums.map((album) => (
            <div key={album.id} onClick={()=>handleAlbumClick(album.id)} style={{ cursor: 'pointer' }}>
              <p className='font-medium'>{album.album_title}</p>
              <img src={album.image} className="w-32 h-32" alt={album.album_title}></img>
              <p>{album.genre}</p>
            </div>
          ))}
        </div>
        <h1 className='text-xl font-bold m-3'>Filter by...</h1>
        <div className='flex flex-row justify-center space-x-10'>
          <div className='flex flex-col border-2 border-black'>
            <h2 className='font-bold'>Label</h2>
            <ul className='rounded overflow-y-auto bg-white h-24 '>
              <li className='m-2' onClick={() => fetchAlbumPageData('http://127.0.0.1:8000/music/api/albums/')}>All labels</li>
              {labels && labels.map((label) => (
                <li key={label.id}
                    className='m-2'
                    onClick={() => fetchAlbumPageData(`http://127.0.0.1:8000/music/api/albums/?label=${label.id}`)}
                >
                  {label.label_name}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col border-2 border-black'>
            <h2 className='font-bold'>Genre</h2>
            <ul className='rounded overflow-y-auto bg-white h-24 '>
              <li className='m-2' onClick={() => fetchAlbumPageData('http://127.0.0.1:8000/music/api/albums/')}>All Genres</li>
              {genres && genres.map((genre) => (
                <li key={genre.id}
                    className='m-2'
                    onClick={() => fetchAlbumPageData(`http://127.0.0.1:8000/music/api/albums/?genres=${genre.id}`)}
                >
                  {genre.genre_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCollection;
