// Search.js

import React, { useState } from 'react';
import SearchList from './SearchList';
import axios from 'axios';
import SearchMovie from './SearchMenu/SearchMovie';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [movieData, setMovieData] = useState([]);

  // 검색어 입력
  const changeInput = (e) => {
    const { value } = e.target; 
    setKeyword(value);
  }
  
  // 검색 실행
  const search = async () => {
    try {
      if (keyword.trim() !== "") {
        const response = await axios.get(`http://localhost:4000/search/${keyword}`);
        setMovieData(response.data);
        console.log('무비데이터:', response.data);
      }
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
    }
  }

  return (
    <div>
      <input type='text' value={keyword} placeholder='검색어를 입력하세요' onChange={changeInput} />
      <button onClick={search}>검색</button>

      {/* 최근검색어 */}
      <SearchList /> 

      {/* 영화작품 */}
      {movieData.length > 0 && <SearchMovie movieData={movieData} />}
    </div>
  );
};

export default Search;
