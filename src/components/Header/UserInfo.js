import React, { useEffect, useState } from 'react';
import '../../styles/Header/UserInfo.css';
import { logoutFunction } from '../Main/MyPage/api/reissue';

function UserInfo() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('access')){
      setIsLogin(true);
    }   
  })

  return (
  <div className="nav_userInfo">
      {!isLogin ? <>
        <div><a href="/join"><ul>회원가입</ul></a></div>
        <div><a href="/login"><ul>로그인</ul></a></div>
      </> : <>
        <div><a href="/mypage"><ul>마이페이지</ul></a></div>
        <div onClick={logoutFunction} style={{ cursor: 'pointer' }}><ul>로그아웃</ul></div>
      </>}
    </div>
  );
}

export default UserInfo;
