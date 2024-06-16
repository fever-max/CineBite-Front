import React from 'react';
import MovieRanking from './MovieRanking';
import MovieReview from './MovieReview';
import MovieToday from './MovieToday';
import MovieList from './MovieList';

function Home() {
  return (
    <div>
      {/* <Test />
      <TestFile /> */}
      ---
      <MovieRanking />
      <MovieReview />
      <MovieToday />
      <MovieList/>
    </div>
  );
}

export default Home;
