// Search.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchMovie from "./SearchMenu/SearchMovie";
import SearchList from "./SearchList";
import {
  saveRelatedData,
  fetchSearchList,
  saveSearchList,
} from "./SearchService";
import "../../../styles/Main/Search/Search.css";
import SearchTotal from "./SearchMenu/SearchTotal";

const Search = () => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [movieData, setMovieData] = useState([]); // 영화 데이터
  const [searchMessage, setSearchMessage] = useState(""); // 검색 메시지
  const [searchKeyword, setSearchKeyword] = useState([]); // 키워드 목록
  const [userId] = useState("guest"); // 사용자 ID

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    if (userId) {
      const searchDataList = await fetchSearchList(userId);
      console.log("fetchData: searchDataList", searchDataList);
      if (searchDataList.length > 0) {
        setSearchKeyword(searchDataList); // 검색어 업데이트
      } else {
        console.log("fetchData: No search data found");
      }
      console.log("최근검색어 가져오기 성공!");
    } else {
      console.error("fetchData: 최근 검색어를 가져오는데 실패했습니다.");
    }
  };

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

  const search = async (keyword) => {
    console.log("search: 검색 시작: ", keyword);
    const searchData = await getSearchData(keyword);
    if (searchData.length > 0) {
      setMovieData(searchData);
      setSearchMessage("");
    } else {
      setMovieData([]);
      setSearchMessage("검색한 결과를 찾을 수 없습니다.");
    }
    // 최근 검색어 목록 업데이트
    const newSearchList = await saveSearchList(userId, [keyword]);
    console.log("newSearchList: ", newSearchList);

    // 이미 최근 검색어 목록에 있는 경우 맨 앞으로 이동시키기
    const existingKeyword = searchKeyword.find(
      (searchList) => searchList.searchKeyword === keyword
    );
    if (existingKeyword) {
      //검색어 제거
      const updatedSearchKeyword = searchKeyword.filter(
        (searchList) => searchList.searchKeyword !== keyword
      );
      //맨 앞 추가
      updatedSearchKeyword.unshift(existingKeyword);
      setSearchKeyword(updatedSearchKeyword);
    } else {
      await fetchData(); // 검색어 목록 다시 불러오기
    }

    if (searchKeyword.length > 0 && searchKeyword[0].searchListNo) {
      const previousSearchListNo = searchKeyword[0].searchListNo;
      console.log("searchKeyword[0]: ", searchKeyword[0]);
      console.log("previousSearchListNo: ", previousSearchListNo);

      await saveRelatedData(previousSearchListNo, userId, keyword);
    } else {
      console.log("첫 번째 검색이므로 연관 검색어 저장 스킵");
    }
    console.log("연관keyword: ", keyword);
  };

  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

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

      <SearchList
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {searchMessage && <p>{searchMessage}</p>}

      {/* <RelatedList keyword={keyword} /> */}
      <SearchTotal />

      {movieData.length > 0 && <SearchMovie movieData={movieData} />}
    </div>
  );
};

export default Search;
