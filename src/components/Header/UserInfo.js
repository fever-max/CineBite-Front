import React from 'react';
import '../../styles/Header/UserInfo.css';
import { logoutFunction } from '../../utils/userInfo/api/reissue';
import { GetUser } from '../../utils/userInfo/api/userApi';

function UserInfo() {

  const { isLogin, userId, userRole } = GetUser();

  const getUserIdForDisplay = (id) => {
    const prefixes = ['naver', 'kakao', 'google'];
    for (const prefix of prefixes) {
      if (id.startsWith(prefix)) {
        return id.substring(6, 11);
      }
    }
    return id;
  };

  const userIdForDisplay = getUserIdForDisplay(userId);

  return (
  <div className="nav_userInfo">
    {!isLogin ? <>
      <div><a href="/favoriteList"><ul>즐겨찾기</ul></a></div>
      <div><a href="/join"><ul>회원가입</ul></a></div>
      <div><a href="/login"><ul>로그인</ul></a></div>
    </> : <>
      {userRole === 'ROLE_ADMIN' && (
        <div><a href="/admin"><ul>{userIdForDisplay}님 관리자 페이지</ul></a></div>
      )}
      {userRole === 'ROLE_WRITER' && (
        <div><a href="/writer"><ul>{userIdForDisplay}님 평론가 페이지</ul></a></div>
      )}
      {userRole !== 'ROLE_ADMIN' && userRole !== 'ROLE_WRITER' && (
        <div><a href="/mypage"><ul>{userIdForDisplay}님 마이페이지</ul></a></div>
      )}
      <div className="cursor" onClick={logoutFunction}><ul>로그아웃</ul></div>
    </>}
  </div>
  );
}

export default UserInfo;
