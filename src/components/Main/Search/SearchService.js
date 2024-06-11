import axios from 'axios';

// DB 불러오기
export const getSearchData = async (keyword) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/movies/search/${keyword}`);
        return response.data;
    } catch (error) {
        console.error('검색 중 오류가 발생했습니다:', error);
        return null;
    }
}


// 검색기록 저장
export const saveSearchList = async (userId, searchList) => {
    // userId가 null 또는 비어 있으면 'aaa'로 설정
    //추후 변경예정
    if (!userId) {
        userId = 'aaa';
    }

    const request = {
        userId: userId,
        keywordListDTO: searchList.map(keyword => ({ keyword: keyword }))
    };
    
    console.log('Request Payload:', request);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/search/saveSearchList`, request);
        console.log('검색기록 저장 성공:', response);
    } catch (error) {
        console.error('검색기록 저장 실패:', error);
    }
};

// 검색어 저장
export const saveSearchKeyword = async (keyword) => {
    const keywordDTO = { keyword };
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/search/saveKeyword`, keywordDTO);

        console.log('검색어 저장 성공:', response);
    } catch (error) {
        console.error('검색어 저장 실패:', error);
    }
};
