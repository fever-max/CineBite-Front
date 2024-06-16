import axios from 'axios';

// 검색어 저장
export const saveSearchList = async (userId, searchList) => {
  // userId가 null 또는 비어 있으면 'guest'로 설정
  // 추후 변경 예정
  if (!userId) {
    userId = 'guest';
  }

  const request = {
    userId: userId,
    keywords: searchList,
  };

  console.log('Request Payload:', request);

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/search/saveSearchList`, request);
    console.log('클라이언트 검색기록 저장 성공:', response);
  } catch (error) {
    console.error('클라이언트 검색기록 저장 실패:', error);
  }
};

// 영화 데이터 불러오기
export const getSearchData = async (keyword) => {
  console.log('키워드:', keyword);
  const url = `${process.env.REACT_APP_API_URL}/api/movie/search/${keyword}`;
  console.log('요청 URL:', url);

  try {
    const response = await axios.get(url, { withCredentials: true });
    console.log('서버 응답:', response.data);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error('서버 요청 오류:', error);
    return [];
  }
};

// 최근 검색어 데이터 가져오기
export const fetchSearchList = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search/user/${userId}`);
      return response.data || [];
    } catch (error) {
      console.error('클라이언트에서 검색어를 가져오는데 실패했습니다.', error);
      return [];
    }
  };