import React, { useEffect, useState } from 'react';
import SearchMovie from './SearchMenu/SearchMovie';
import { saveSearchList, getSearchData } from './SearchService'; 
import SearchList from './SearchList';
import '../../../styles/Main/Search/Search.css';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  const userId = 'guest';

  // 검색 실행
  const search = async () => {
    if (keyword.trim() !== '') {
      const searchData = await getSearchData(keyword);

      if (searchData.length > 0) {
        setMovieData(searchData);
        setSearchMessage('');
      } else {
        setMovieData([]);
        setSearchMessage('검색한 결과를 찾을 수 없습니다.');
      }
      saveSearchList(userId, [keyword]);

      // 검색 후 입력창 초기화
      setKeyword('');

    } else {
      setMovieData([]);
      setSearchMessage('');
    }
  };

  // 검색어 입력
  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  // 검색어가 변경될 때마다 결과값 초기화
  useEffect(() => {
    setMovieData([]);
    setSearchMessage('');
  }, [keyword]);

  // 엔터키를 누르면 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  };

  // - todo: 최근검색어 하나씩 삭제 / 전체삭제

  return (
    <div>
      <input
        type='text'
        className='input_box'
        value={keyword}
        placeholder='보고싶은 영화, 배우, 커뮤니티 글을 찾아보세요'
        onChange={changeInput}
        onKeyDown={handleKeyPress} />
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
