import React from 'react';
import MovieRanking from './MovieRanking';
import MovieReview from './MovieReview';
import MovieToday from './MovieToday';
import TestFile from '../../TestFile';
import MovieList from './MovieList';
function Home() {
  return (
    <div>
      {/* <Test />
      <TestFile /> */}
      ---
      <MovieList/>
      <MovieRanking />
      <MovieReview />
      <MovieToday />
    </div>
  );
}

export default Home;
