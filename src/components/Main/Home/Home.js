import React from 'react';
import Test from '../../Test';
import MovieRanking from './MovieRanking';
import MovieReview from './MovieReview';
import MovieToday from './MovieToday';
import TestFile from '../../TestFile';
import MovieData from '../Search/MovieData';

function Home() {
  return (
    <div>
      <MovieData/>
      <Test />
      <TestFile />
      ---
      <MovieRanking />
      <MovieReview />
      <MovieToday />
    </div>
  );
}

export default Home;
