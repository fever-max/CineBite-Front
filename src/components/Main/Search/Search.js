import React, { useEffect, useState } from 'react';
import SearchList from './SearchList';
import SearchMovie from './SearchMenu/SearchMovie';
import {getSearchData, saveSearchKeyword, saveSearchList} from './SearchService';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');
  
  const userId = 'aaa';
  
  // 검색어 입력
  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  }

  //검색어 입력 시 실행
  const search = async(keyword) => {
    if (keyword.trim() !== "") {
      const searchData =  await getSearchData(keyword); // DB 가져오기
    
      //검색 결과가 있으면
      if(searchData && searchData.length > 0) {
        setMovieData(searchData);

      //검색 결과가 없으면
      }else { 
        setMovieData([]);
        setSearchMessage('검색한 결과를 찾을 수 없습니다.');
      }
      saveSearchList(userId, [keyword]);
      saveSearchKeyword(keyword);
    } else {
      setMovieData([]);
      setSearchMessage('');
    }
  }


  //검색어가 변경 될 때 마다 결과값 초기화
  useEffect(() => {
    setMovieData([]);
    setSearchMessage('');
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

       {/* 검색 결과 메시지 */}
    {searchMessage && <p>{searchMessage}</p>}

      {/* 영화작품 */}
      {movieData.length > 0 && <SearchMovie movieData={movieData} />}
    </div>
  );
};

export default Search;
