import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchMovie from "./SearchMenu/SearchMovie";
import SearchList from "./SearchList";
import { fetchSearchList, saveSearchList } from "./SearchService";
import "../../../styles/Main/Search/Search.css";
import SearchTotal from "./SearchMenu/SearchTotal";

const Search = () => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [movieData, setMovieData] = useState([]); // 영화 데이터
  const [searchMessage, setSearchMessage] = useState(""); // 검색 메시지
  const [searchKeyword, setSearchKeyword] = useState([]); // 키워드 목록
  const userId = "guest";

  useEffect(() => {
    fetchData();
  }, []);

  // 최근 검색어 목록 가져오기
  const fetchData = async () => {
    if (userId) {
      await fetchSearchList(userId, setSearchKeyword);
      console.log("최근검색어 가져오기 성공!");
    } else {
      console.error("최근 검색어를 가져오는데 실패했습니다.");
    }
  };

  // DB에서 데이터 가져오기
  const getSearchData = async (keyword) => {
    console.log("키워드:", keyword);
    const url = `${process.env.REACT_APP_API_URL}/movie/search/${keyword}`;
    console.log("요청 URL:", url);
    try {
      const response = await axios.get(url);
      console.log("서버 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("서버 요청 오류:", error);
      return [];
    }
  };

  // 검색 실행
  const search = async (keyword) => {
    const searchData = await getSearchData(keyword);
    if (searchData.length > 0) {
      setMovieData(searchData);
      setSearchMessage("");
    } else {
      setMovieData([]);
      setSearchMessage("검색한 결과를 찾을 수 없습니다.");
    }
    await saveSearchList(userId, [keyword]);
    fetchData();
  };

  // 검색어 입력 시 처리 함수
  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  // 검색 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    await search(keyword);
    setKeyword("");
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

      {/* 최근 검색어 목록 */}
      <SearchList
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      {/* 검색 결과 메시지 */}
      {searchMessage && <p>{searchMessage}</p>}

      <SearchTotal />

      {/* 영화 목록 */}
      {movieData.length > 0 && <SearchMovie movieData={movieData} />}
    </div>
  );
};

export default Search;
