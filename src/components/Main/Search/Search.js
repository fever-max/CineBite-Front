import React, { useEffect, useState } from 'react';
import SearchList from './SearchList';
import SearchMovie from './SearchMenu/SearchMovie';
import {saveSearchKeyword, saveSearchList} from './SearchService';
import axios from 'axios';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');
  
  const userId = 'aaa';

  // DB 불러오기
  const getSearchData = async (keyword) => {

    console.log("키워드 : ", keyword);
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movie/search/${keyword}`, {withCredential : true});
      console.log("주소데이터 : ", response.data);
      return response.data; // 데이터 반환
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
      return []; // 오류 시 빈 배열 반환
    }
  }

  
  // 검색어 입력
  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  }

  //검색어 입력 시 실행
  const search = async(keyword) => {
    console.log("서치키워드 : ", keyword);
    if (keyword.trim() !== "") { //공백없이도 빈 문자열이 아니면
      const searchData =  await getSearchData(keyword); // DB 가져오기
      console.log("DB에서 가져온 데이터 : ", searchData);
    
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
      {movieData.length > 0 && <SearchMovie movieData={movieData} setMovieData={setMovieData}/>}
    </div>
  );
};

export default Search;
