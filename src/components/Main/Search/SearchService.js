import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// 검색어 저장
export const saveSearchList = async (userId, keyword) => {
  try {
    // 만약 userId가 null이거나 비어 있다면 'guest'로 설정합니다.
    userId = userId || "guest";
    const request = {
      userId: userId,
      keywords: keyword,
    };
    console.log("요청한 검색어 :", request);
    const response = await axios.post(
      `${API_URL}/api/search/saveSearchList`,
      request
    );
    console.log("클라이언트 검색 기록 저장 성공:", response);
  } catch (error) {
    console.error("클라이언트 검색 기록 저장 실패:", error);
  }
};

//검색어 삭제
export const deleteSearchList = async (userId, searchListNo) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/search/delete/${userId}/${searchListNo}`
    );
    console.log("클라이언트 검색어 삭제 성공:", response.data);
  } catch (error) {
    console.log("클라이언트 검색어 삭제 실패:", error);
  }
};

//검색어 전체삭제
export const deleteAll = async (userId) => {
  userId = userId || "guest";
  try {
    const response = await axios.delete(
      `${API_URL}/api/search/delete/${userId}`
    );
    console.log("클라이언트 검색어 전체삭제 성공:", response.data);
  } catch (error) {
    console.log("클라이언트 검색어 전체삭제 실패:", error);
  }
};

// 영화 데이터 가져오기
export const getSearchData = async (keyword) => {
  try {
    console.log("키워드:", keyword);
    const response = await axios.get(`${API_URL}/api/movie/search/${keyword}`);
    console.log("서버 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("서버 요청 오류:", error);
    return [];
  }
};

// 최근 검색어 목록 가져오기
export const fetchSearchList = async (userId, setSearchKeyword) => {
  const response = await axios.get(`${API_URL}/api/search/user/${userId}`);

  if (response && response.data && Array.isArray(response.data)) {
    const searchData = response.data;
    //검색어 목록 - 날짜별 내림차순
    searchData.sort(
      (a, b) => new Date(b.searchListTime) - new Date(a.searchListTime)
    );
    setSearchKeyword(searchData); // 검색어 업데이트
    return searchData;
  } else {
    setSearchKeyword([]); // 값 비우기
    return [];
  }
};

//연관검색어 저장
// export const saveRelatedData = async (primaryKeyword, secondaryKeyword) => {
//   try {
//     console.log("primaryKeyword:", primaryKeyword);
//     console.log("secondaryKeyword :", secondaryKeyword);
//     const response = await axios.post(`${API_URL}/related/search/save`, {
//       keywords: [primaryKeyword, secondaryKeyword],
//     });
//     console.log("클라이언트 연관 검색어 저장 성공:", response);
//     return response.data; // Optionally, return response data if needed
//   } catch (error) {
//     console.error("클라이언트 연관 검색어 저장 실패:", error);
//     throw error; // Re-throw the error to handle it elsewhere if needed
//   }
// };
