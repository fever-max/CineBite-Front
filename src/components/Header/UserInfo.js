import React, { useEffect, useState } from 'react';
import '../../styles/Header/UserInfo.css';
import { logoutFunction } from '../../utils/userInfo/api/reissue';
import { jwtDecode } from 'jwt-decode';

function UserInfo() {

  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setIsLogin(true);
      const decodedToken = jwtDecode(token);
      setNickname(decodedToken.userNick);
    }   
  }, []);

  return (
  <div className="nav_userInfo">
      {!isLogin ? <>
        <div><a href="/join"><ul>회원가입</ul></a></div>
        <div><a href="/login"><ul>로그인</ul></a></div>
      </> : <>
        <div><a href="/mypage"><ul>{nickname}님 마이페이지</ul></a></div>
        <div className="cursor" onClick={logoutFunction}><ul>로그아웃</ul></div>
      </>}
    </div>
  );
}

export default UserInfo;
