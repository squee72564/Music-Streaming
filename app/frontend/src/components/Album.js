import React from "react";

const Album = ({ album, handleAlbumClick }) => {
  return (
    <div
      key={album.id}
      onClick={() => handleAlbumClick(album.id)}
      className="p-5 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
      style={{ cursor: "pointer" }}
    >
      <p className="font-medium">{album.album_title}</p>
      <img src={album.image} className="w-32 h-32" alt={album.album_title} />
      <p>{album.genre}</p>
    </div>
  );
};

export default Album;
