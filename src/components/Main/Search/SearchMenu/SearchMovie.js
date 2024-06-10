import React from 'react';

const SearchMovie = ({ movieData }) => {
  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {/* key 값 = 추후 movieData를 받아 바꿀 예정 */}
        {movieData.map((movie, index) => (
          <li key={index}>
            {movie.movieNm} / {movie.actors}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovie;
