import React from 'react';
import MovieRanking from './MovieRanking';
import MovieReview from './MovieReview';
import MovieToday from './MovieToday';
import TestFile from '../../TestFile';
function Home() {
  return (
    <div>
      {/* <Test />
      <TestFile /> */}
      <MovieRanking />
      <MovieReview />
      <MovieToday />
    </div>
  );
}

export default Home;
