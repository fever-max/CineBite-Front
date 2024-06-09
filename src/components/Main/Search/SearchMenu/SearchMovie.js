import React from 'react';

const SearchMovie = ({ movieData }) => {
  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {movieData.map(movie => (
          <li key={movie.movieCd}>
            {movie.movieNm} / {movie.actors}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovie;
