import React, { useEffect, useState } from 'react';
import '../../styles/Header/UserInfo.css';
import axios from 'axios';

function UserInfo() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('access')){
      setIsLogin(true);
    }   
  })

  const logoutFunction =  async () => {
    try {
      const response = await axios.post('http://localhost:4000/logout', {}, {
        withCredentials: true
      });
      if (response.status === 200) { // 성공 시 토큰 삭제
        localStorage.removeItem('access');
        window.location.href = '/';
      } else { // 실패 시 토큰 삭제
        localStorage.removeItem('access');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그아웃 오류', error);
      localStorage.removeItem('access');
      window.location.href = '/';
    }
  };

  return (
  <div className="nav_userInfo">
      {!isLogin ? <>
        <div><a href="/join"><ul>회원가입</ul></a></div>
        <div><a href="/login"><ul>로그인</ul></a></div>
      </> : <>
        <div><a href="/mypage"><ul>마이페이지</ul></a></div>
        <div onClick={logoutFunction}><ul>로그아웃</ul></div>
      </>}
    </div>
  );
}

export default UserInfo;
