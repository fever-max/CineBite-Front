import React from 'react';
import '../../styles/Header/UserInfo.css';

function UserInfo() {
  return (
    <div className="nav_userInfo">
      <a href="/login">
        <ul>로그인</ul>
      </a>
      <ul>로그아웃</ul>
      <a href="/join">
        <ul>회원가입</ul>
      </a>
    </div>
  );
}

export default UserInfo;
