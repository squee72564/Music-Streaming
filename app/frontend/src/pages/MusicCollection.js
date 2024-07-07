// ProfilepPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Album from "../components/Album";
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
  const [filters, setFilters] = useState({ label: "", genre: "" });

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

  const handleFilterClick = async (genreId = "", labelId = "") => {
    const updatedFilters = {
      ...filters,
      genre: genreId ? `${genreId}` : "",
      label: labelId ? `${labelId}` : "",
    };

    setFilters(updatedFilters);

    const uri =
      `${API_URLS.ALBUMS}` +
      `${updatedFilters.genre ? "?genres=" + updatedFilters.genre : "?"}` +
      `${updatedFilters.label && updatedFilters.genre ? "&" : ""}` +
      `${updatedFilters.label ? "label=" + updatedFilters.label : ""}`;

    await fetchAlbumPageData(uri);
  };

  const fetchAlbumPageData = async (url) => {
    if (url) {
      await fetchPaginatedContent(url, setAlbums, setNextPage, setPrevPage);
    }
  };

  return (
    <div className="flex flex-row">
      {/* Left Container for albums */}
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
          className="flex flex-wrap justify-center items-center min-h-48"
        >
          {albums && albums.length !== 0 ? (
            albums.map((album) => (
              <Album
                key={album.id}
                album={album}
                handleAlbumClick={handleAlbumClick}
              />
            ))
          ) : (
            <span className="font-bold">No albums to show</span>
          )}
        </div>
      </div>
      {/* Right Container for filtering albums */}
      {filterEnabled && (
        <div className="flex flex-[1_1_0%] flex-row justify-center m-5 bg-white h-96">
          <div className="flex flex-col flex-1 text-center border-2 border-black">
            <span className="bg-gray-400">Labels</span>
            <ul className="overflow-y-auto bg-white h-auto">
              <li
                className={`m-2 hover:bg-gray-300 ${
                  !filters.label ? "bg-gray-300" : ""
                }`}
                onClick={async () => await handleFilterClick(filters.genre, "")}
              >
                All labels
              </li>
              {labels &&
                labels.map((label) => (
                  <li
                    key={label.id}
                    className={`m-2 hover:bg-gray-300 ${
                      filters.label && filters.label == label.id
                        ? "bg-gray-300"
                        : ""
                    }`}
                    onClick={async () =>
                      await handleFilterClick(filters.genre, label.id)
                    }
                  >
                    {label.label_name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col flex-1 text-center border-2 border-black">
            <span className="bg-gray-400">Genres</span>
            <ul className="overflow-y-auto bg-white h-auto">
              <li
                className={`m-2 hover:bg-gray-300 ${
                  !filters.genre ? "bg-gray-300" : ""
                }`}
                onClick={async () => await handleFilterClick("", filters.label)}
              >
                All Genres
              </li>
              {genres &&
                genres.map((genre) => (
                  <li
                    key={genre.id}
                    className={`m-2 hover:bg-gray-300 ${
                      filters.genre && filters.genre == genre.id
                        ? "bg-gray-300"
                        : ""
                    }`}
                    onClick={async () =>
                      await handleFilterClick(genre.id, filters.label)
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
