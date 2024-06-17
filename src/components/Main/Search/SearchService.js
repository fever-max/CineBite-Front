import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 검색어 저장
//...searchList : 배열로 받음
export const saveSearchList = async (userId, setSearchKeyword, ...searchList) => {
  try {
    // 만약 userId가 null이거나 비어 있다면 'guest'로 설정합니다.
    userId = userId || 'guest';

    const request = {
      userId: userId,
      keywords: searchList,
    };

    console.log('요청 페이로드:', request);

    const response = await axios.post(`${API_URL}/api/search/saveSearchList`, request);
    console.log('클라이언트 검색 기록 저장 성공:', response);

    // 최근 검색 데이터 업데이트
    await fetchSearchData(userId, setSearchKeyword);

  } catch (error) {
    console.error('클라이언트 검색 기록 저장 실패:', error);
  }
};

// 영화 데이터 가져오기
export const getSearchData = async (keyword) => {
  try {
    console.log('키워드:', keyword);
    const url = `${API_URL}/api/movie/search/${keyword}`;
    console.log('요청 URL:', url);

    const response = await axios.get(url);
    console.log('서버 응답:', response.data);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error('서버 요청 오류:', error);
    return [];
  }
};

// 최근 검색어 목록 가져오기
export const fetchSearchList = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/search/user/${userId}`);
    let searchData = response.data || [];

    // 검색어 목록에서 null 또는 빈 문자열을 필터링하여 처리
    searchData = searchData.filter(item => item.searchKeyword && item.searchKeyword.trim() !== '');

    return searchData;
  } catch (error) {
    console.error('클라이언트에서 검색어 가져오기 실패:', error);
    return [];
  }
};

// 최근 검색어 데이터 가져오기 (검색어 저장 후 호출될 함수)
export const fetchSearchData = async (userId, setSearchKeyword) => {
  try {
    const searchData = await fetchSearchList(userId);
    setSearchKeyword(searchData); // 검색어 상태 업데이트
  } catch (error) {
    console.error('최근 검색어 가져오기 실패:', error);
    setSearchKeyword([]); // 오류 시 빈 배열로 설정
  }
};
