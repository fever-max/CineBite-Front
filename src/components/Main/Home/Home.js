import React from 'react';
import Test from '../../Test';
import MovieRanking from './MovieRanking';
import MovieReview from './MovieReview';
import MovieToday from './MovieToday';

function Home() {
  return (
    <div>
      <Test />
      ---
      <MovieRanking />
      <MovieReview />
      <MovieToday />
    </div>
  );
}

export default Home;
