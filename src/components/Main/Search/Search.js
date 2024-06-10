import React, { useEffect, useState } from 'react';
import SearchList from './SearchList';
import SearchMovie from './SearchMenu/SearchMovie';
import {getSearchData, saveSearchKeyword, saveSearchList} from './SearchService';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [movieData, setMovieData] = useState([]);

  // 검색어 입력
  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  }

  //검색어 입력 시 실행
  const search = (keyword) => {
    if (keyword.trim() !== "") {
      getSearchData(keyword); // DB 가져오기
      saveSearchKeyword(keyword); // 검색어 저장 
      saveSearchList(keyword); // 검색 기록 저장 
    } else {
      setMovieData([]);
    }
  }


  //검색어가 변경 될 때 마다 결과값 초기화
  useEffect(() => {
    setMovieData([]);
  }, [keyword]);


  return (
    <div>
      <input
        type='text'
        value={keyword}
        placeholder='보고싶은 영화, 배우, 커뮤니티 글을 찾아보세요'
        onChange={changeInput} />
      <button onClick={() => search(keyword)}>검색</button>

      {/* 최근검색어 */}
      <SearchList />

      {/* 영화작품 */}
      {movieData.length > 0 && <SearchMovie movieData={movieData} />}
    </div>
  );
};

export default Search;
