import React from 'react';
import Nav from '../components/Header/Nav';
import UserInfo from '../components/Header/UserInfo';
import '../styles/Header/Header.css';

function Header() {
  return (
    <div className="header_div">
      <UserInfo />
      <Nav />
    </div>
  );
}

export default Header;
