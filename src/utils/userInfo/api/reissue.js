import axios from "axios";

export const getAccessToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reissue`, {}, {
        withCredentials: true
      });
      const accessToken = response.headers['access'];
      localStorage.setItem('access', accessToken);
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      alert('로그인 시간이 만료됐습니다. 다시 로그인해주세요.')
      logoutFunction();
    }
  };

export const logoutFunction =  async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, {
      withCredentials: true
    });
    if (response.status === 200) {
      localStorage.removeItem('access');
      window.location.href = '/';
    } else {
      localStorage.removeItem('access');
      window.location.href = '/';
    }
  } catch (error) {
    console.error('로그아웃 오류', error);
    localStorage.removeItem('access');
    window.location.href = '/';
  }
};  
