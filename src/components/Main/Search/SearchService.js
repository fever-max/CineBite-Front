import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// 검색어 저장
export const saveSearchList = async (userId, keyword) => {
  try {
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
    return response.data;
  } catch (error) {
    console.error("클라이언트 검색 기록 저장 실패:", error);
    return null;
  }
};

// 검색어 삭제
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

// 검색어 전체 삭제
export const deleteAll = async (userId) => {
  userId = userId || "guest";
  try {
    const response = await axios.delete(
      `${API_URL}/api/search/delete/${userId}`
    );
    console.log("클라이언트 검색어 전체 삭제 성공:", response.data);
  } catch (error) {
    console.log("클라이언트 검색어 전체 삭제 실패:", error);
  }
};

//영화 데이터 조회
// export const getSearchData = async (keyword) => {
//   try {
//     console.log("영화 데이터 키워드:", keyword);
//     const response = await axios.get(`${API_URL}/api/movie/search/${keyword}`);
//     console.log("영화 데이터 서버 응답:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("영화 데이터 서버 요청 오류:", error);
//     return [];
//   }
// };

// export const getCommunityTitle = async (keyword) => {
//   try {
//     console.log("커뮤니티 제목 키워드:", keyword);
//     const response = await axios.post(`${API_URL}/search/post/title`, {
//       title: keyword,
//     });
//     console.log("커뮤니티 제목 서버 응답:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("커뮤니티 제목 서버 요청 오류:", error);
//     return [];
//   }
// };

// export const getCommunityContent = async (keyword) => {
//   try {
//     console.log("커뮤니티 내용 키워드:", keyword);
//     const response = await axios.post(`${API_URL}/search/post/content`, {
//       content: keyword,
//     });
//     console.log("커뮤니티 내용 서버 응답:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("커뮤니티 내용 서버 요청 오류:", error);
//     return [];
//   }
// };

// export const getCommunityUserId = async (keyword) => {
//   try {
//     console.log("커뮤니티 작성자 키워드:", keyword);
//     const response = await axios.post(`${API_URL}/search/post/userId`, {
//       userId: keyword,
//     });
//     console.log("커뮤니티 작성자 서버 응답:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("커뮤니티 작성자 서버 요청 오류:", error);
//     return [];
//   }
// };

// 최근 검색어 목록 가져오기
export const fetchSearchList = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/search/user/${userId}`);
    console.log("fetchSearchList response:", response.data);
    if (response && response.data && Array.isArray(response.data)) {
      const searchData = response.data;
      // 검색어 목록 - 날짜별 내림차순
      searchData.sort(
        (a, b) => new Date(b.searchListTime) - new Date(a.searchListTime)
      );
      return searchData;
    } else {
      return [];
    }
  } catch (error) {
    console.error("최근 검색어 목록 가져오기 실패:", error);
    throw error;
  }
};

// 연관 검색어 저장
export const saveRelatedData = async (
  previousSearchListNo,
  userId,
  keyword
) => {
  try {
    const response = await axios.post(`${API_URL}/related/save`, {
      searchListNo: previousSearchListNo,
      userId: userId,
      keywords: [keyword],
    });
    console.log("요청한 연관 검색어 저장 데이터:", {
      searchListNo: previousSearchListNo,
      userId: userId,
      keywords: [keyword],
    });
    console.log("클라이언트 연관 검색어 저장 성공:", response);
    return response.data;
  } catch (error) {
    console.error("클라이언트 연관 검색어 저장 실패:", error);
    throw error;
  }
};

// 연관 검색어 조회
export const findRelatedByKeyword = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/related/find/${keyword}`);
    console.log("키워드로 연관 검색어 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    return [];
  }
};

//검색된 작품 수 카운트
export const searchMoviesCount = async (keyword) => {
  try {
    const response = await axios.post("${API_URL}/movie/moviesCount", {
      keyword: keyword,
    });
    return response.data;
  } catch (error) {
    console.error("검색된 작품 수 불러오기 실패: ", error);
    throw error;
  }
};
