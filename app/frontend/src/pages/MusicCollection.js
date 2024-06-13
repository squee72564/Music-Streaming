// ProfilepPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPaginatedContent } from "../utils/api";
import { API_URLS } from "../utils/apiConfig";

const MusicCollection = () => {
  const navigate = useNavigate();
  const username = document
    .getElementById("root")
    .getAttribute("data-username");
  const [albums, setAlbums] = useState(null);
  const [labels, setLabels] = useState(null);
  const [genres, setGenres] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [filterEnabled, setFilterEnabled] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchPaginatedContent(
            API_URLS.ALBUMS,
            setAlbums,
            setNextPage,
            setPrevPage
          ),
          fetchPaginatedContent(API_URLS.LABELS, setLabels, null, null),
          fetchPaginatedContent(API_URLS.GENRES, setGenres, null, null),
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllData();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/music/collection/${albumId}`);
  };

  const fetchAlbumPageData = (url) => {
    if (url) {
      fetchPaginatedContent(url, setAlbums, setNextPage, setPrevPage);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex-[2_2_0%] flex-col justify-center text-center">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold m-5">Welcome, {username}!</h1>
          <div className="flex flex-row">
            <button
              className="font-bold rounded-lg bg-gray-300 hover:bg-gray-400 m-5 px-2"
              onClick={() => {
                setFilterEnabled(!filterEnabled);
              }}
            >
              {!filterEnabled ? "Filter by..." : "Close"}
            </button>
          </div>
        </div>
        <h1 className="text-xl font-bold m-3">Your Albums</h1>
        <div className="space-x-10">
          <button
            className="text-white bg-gray-500 hover:bg-gray-800 font-medium rounded-lg text-sm py-1 px-2.5 text-center"
            onClick={() => fetchAlbumPageData(prevPage)}
          >
            Prev
          </button>
          <button
            className="text-white bg-gray-500 hover:bg-gray-800 font-medium rounded-lg text-sm py-1 px-2.5 text-center"
            onClick={() => fetchAlbumPageData(nextPage)}
          >
            Next
          </button>
        </div>
        <div
          id="Albums"
          className="flex flex-wrap justify-center space-x-10 m-5 min-h-48"
        >
          {albums && albums.length !== 0 ? (
            albums.map((album) => (
              <div
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
                className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                style={{ cursor: "pointer" }}
              >
                <p className="font-medium">{album.album_title}</p>
                <img
                  src={album.image}
                  className="w-32 h-32"
                  alt={album.album_title}
                ></img>
                <p>{album.genre}</p>
              </div>
            ))
          ) : (
            <span className="font-bold">No albums to show</span>
          )}
        </div>
      </div>
      {filterEnabled && (
        <div className="flex flex-[1_1_0%] flex-row justify-center m-5 bg-white">
          <div className="flex flex-col flex-1 text-center border-2 border-black">
            <span className="bg-gray-400">Labels</span>
            <ul className="overflow-y-auto">
              <li
                className="m-2 hover:bg-gray-200"
                onClick={() => fetchAlbumPageData(API_URLS.ALBUMS)}
              >
                All labels
              </li>
              {labels &&
                labels.map((label) => (
                  <li
                    key={label.id}
                    className="m-2 hover:bg-gray-200"
                    onClick={() =>
                      fetchAlbumPageData(`${API_URLS.ALBUMS}?label=${label.id}`)
                    }
                  >
                    {label.label_name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col flex-1 text-center border-2 border-black">
            <span className="bg-gray-400">Genres</span>
            <ul className="overflow-y-auto bg-white h-32">
              <li
                className="m-2 hover:bg-gray-200"
                onClick={() => fetchAlbumPageData(API_URLS.ALBUMS)}
              >
                All Genres
              </li>
              {genres &&
                genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="m-2 hover:bg-gray-200"
                    onClick={() =>
                      fetchAlbumPageData(
                        `${API_URLS.ALBUMS}?genres=${genre.id}`
                      )
                    }
                  >
                    {genre.genre_name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCollection;
