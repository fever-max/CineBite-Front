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
            <div className="search_movies_r">
              <div className="loader">
                <ul className="search_movies_list">
                  <img
                    className="search_poster"
                    src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                  />
                  <div>
                    <li className="search_title">{movie.title}</li>
                    <li className="search_genres">
                      {movie.genres.map((genre) => genre.name).join(" / ")}
                    </li>
                    <li className="search_date">{movie.release_date}</li>
                  </div>
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovie;
