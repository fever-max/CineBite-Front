import axios from 'axios';

// DB 불러오기
export const getSearchData = async (keyword) => {
    try {
        const response = await axios.get(`http://localhost:4000/movies/search/${keyword}`);
        return response.data;
    } catch (error) {
        console.error('검색 중 오류가 발생했습니다:', error);
        return null;
    }
}

// 검색어 저장
export const saveSearchKeyword = (keyword, userEmail) => {
    axios.post('http://localhost:4000/search/saveSearchKeyword', { keyword, userEmail })
        .then(response => {
            console.log('검색어 저장 성공:', response);
        })
        .catch(error => {
            console.error('검색어 저장 실패:', error);
        });
};

// 검색기록 저장
export const saveSearchList = (searchList, userEmail) => {
    axios.post('http://localhost:4000/search/saveSearchList', { searchList, userEmail })
        .then(response => {
            console.log('검색기록 저장 성공:', response);
        })
        .catch(error => {
            console.error('검색기록 저장 실패:', error);
        });
};