import React from "react";
import "../../../../styles/Main/Search/SearchMovie.css";

const SearchMovie = ({ movieData }) => {
  console.log("불러와진 데이터 확인", movieData);

  return (
    <div className="search_movies">
      <h2>검색 결과</h2>
      <ul>
        {movieData.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <img
              src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovie;
