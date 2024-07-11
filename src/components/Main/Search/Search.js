import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchList from "./SearchList";
import SearchMenu from "./SearchMenu/SearchMenu";
import {
  saveRelatedData,
  fetchSearchList,
  saveSearchList,
  findRelatedByKeyword,
} from "./SearchService";
import "../../../styles/Main/Search/Search.css";
import { useUserData } from "../../../utils/userInfo/api/userApi";

const Search = () => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [movieData, setMovieData] = useState([]); // 영화 데이터
  const [searchMessage, setSearchMessage] = useState(""); // 검색 메시지
  const [searchKeyword, setSearchKeyword] = useState([]); // 키워드 목록
  const [submittedKeyword, setSubmittedKeyword] = useState(""); // 제출된 검색어
  const [relatedKeywords, setRelatedKeywords] = useState([]); // 연관 검색어
  const { userData, loading } = useUserData();

  useEffect(() => {
    if (userData && userData.userId) {
      fetchData();
    }
  }, [userData, setSearchKeyword]);

  if (loading) return <div>Loading...</div>;

  const fetchData = async () => {
    const searchDataList = await fetchSearchList(userData.userId);
    console.log("fetchData: searchDataList", searchDataList);
    if (searchDataList.length > 0) {
      setSearchKeyword(searchDataList);
    } else {
      console.log("fetchData: 데이터를 찾을 수 없습니다.");
    }
    console.log("최근검색어 가져오기 성공!");
  };

  const getSearchData = async (keyword) => {
    console.log("키워드:", keyword);
    const url = `${process.env.REACT_APP_API_URL}/movie/search/${keyword}`;
    console.log("요청 URL:", url);
    try {
      const response = await axios.get(url);
      console.log("서버 응답:", response.data);
      if (response.data.length === 0) {
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("서버로 보내는 요청 오류:", error);
      throw new Error("서버로 보내는 요청 오류");
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
    // 연관 검색어 초기화
    setRelatedKeywords([]);

    // 최근 검색어 목록 업데이트
    const newSearchList = await saveSearchList(userData.userId, [keyword]);
    console.log("newSearchList: ", newSearchList);

    // 이미 최근 검색어 목록에 있는 경우 맨 앞으로 이동시키기
    const existingKeyword = searchKeyword.find(
      (searchList) => searchList.searchKeyword === keyword
    );
    if (existingKeyword) {
      // 검색어 제거
      const updatedSearchKeyword = searchKeyword.filter(
        (searchList) => searchList.searchKeyword !== keyword
      );
      // 맨 앞 추가
      updatedSearchKeyword.unshift(existingKeyword);
      setSearchKeyword(updatedSearchKeyword);
    } else {
      // 검색어 목록 다시 불러오기
      await fetchData();
    }

    if (searchKeyword.length > 0 && searchKeyword[0].searchListNo) {
      const previousSearchListNo = searchKeyword[0].searchListNo;
      console.log("searchKeyword[0]: ", searchKeyword[0]);
      console.log("previousSearchListNo: ", previousSearchListNo);

      await saveRelatedData(previousSearchListNo, userData.userId, keyword);
      await fetchAndSetRelatedKeywords(keyword);
    } else {
      console.log("첫 번째 검색이므로 연관 검색어 저장 스킵");
    }
    console.log("연관keyword: ", keyword);
  };

  const fetchAndSetRelatedKeywords = async (keyword) => {
    const relatedData = await findRelatedByKeyword(keyword);
    setRelatedKeywords(relatedData);
  };

  const changeInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedKeyword(keyword);
    await search(keyword);
    setKeyword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
          <input
            id="query"
            className="input"
            type="search"
            placeholder="보고싶은 영화, 배우, 커뮤니티 글을 찾아보세요"
            name="searchbar"
            value={keyword}
            onChange={changeInput}
          />
        </div>
      </form>
      <SearchList
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        relatedKeywords={relatedKeywords}
      />
      {searchMessage && <p>{searchMessage}</p>}
      <SearchMenu movieData={movieData} />
    </div>
  );
};

export default Search;
