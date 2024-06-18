import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchMovie from './SearchMenu/SearchMovie';
import SearchList from './SearchList';
import { saveSearchList } from './SearchService';
import '../../../styles/Main/Search/Search.css';

const Search = () => {
  const [keyword, setKeyword] = useState(''); // 검색어
  const [movieData, setMovieData] = useState([]); // 영화 데이터
  const [searchMessage, setSearchMessage] = useState(''); // 검색 메시지
  const [searchKeyword, setSearchKeyword] = useState([]); // 키워드 목록

  const userId = 'guest';

  // DB에서 데이터 불러오기
  const getSearchData = async (keyword) => {
    
    console.log('키워드:', keyword);
    const url = `${process.env.REACT_APP_API_URL}/movie/search/${keyword}`;
    console.log('요청 URL:', url);

    try {
      const response = await axios.get(url);
      console.log('서버 응답:', response.data);
      return response.data; // 데이터 반환
    } catch (error) {
      console.error('서버 요청 오류:', error);
      return []; // 오류 시 빈 배열 반환
    }
  };

  // 검색 실행
  const search = async (keyword) => {
    if (keyword.trim() !== '') {
      const searchData = await getSearchData(keyword);

      if (searchData.length > 0) {
        setMovieData(searchData);
        setSearchMessage('');
      } else {
        setMovieData([]);
        setSearchMessage('검색한 결과를 찾을 수 없습니다.');
      }
      await saveSearchList(userId, setSearchKeyword, keyword);
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

  // 폼 제출 시 검색 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    search(keyword);
    setKeyword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input_box"
          value={keyword}
          placeholder="보고싶은 영화, 배우, 커뮤니티 글을 찾아보세요"
          onChange={changeInput}
        />
        <button type="submit">검색</button>
      </form>

      {/* 최근검색어 */}
      <SearchList userId={userId} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

      {/* 검색 결과 메시지 */}
      {searchMessage && <p>{searchMessage}</p>}

      {/* 영화작품 */}
      {movieData.length > 0 && <SearchMovie movieData={movieData} />}
    </div>
  );
};

export default Search;
