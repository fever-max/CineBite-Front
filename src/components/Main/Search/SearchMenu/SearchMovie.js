import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../styles/Main/Search/SearchMovie.css";
import MovieAllList from "./MovieAllList";

const SearchMovie = ({ movieData, submittedKeyword, movieAllData }) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  console.log("불러와진 데이터 확인", movieData);

  return (
    <div className="search_movies">
      {submittedKeyword && movieData.length > 0 ? (
        <>
          <h2>[영화] 검색 결과</h2>
          <ul>
            {(showAll ? movieData : movieData.slice(0, 2)).map((movie) => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className="_r">
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
                            {movie.genres
                              .map((genre) => genre.name)
                              .join(" / ")}
                          </li>
                          <li className="search_date">{movie.release_date}</li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {movieData.length > 3 && (
            <div className="button_container">
              <button
                className="show_more_button"
                onClick={handleToggleShowAll}
              >
                {showAll ? "접기" : " 더보기"}
              </button>
            </div>
          )}
        </>
      ) : (
        <MovieAllList movieAllData={movieAllData} />
      )}
    </div>
  );
};

export default SearchMovie;
