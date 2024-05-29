import React from 'react';
import '../../styles/Header/Nav.css';
import { FaSearch } from 'react-icons/fa';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { AiFillLike } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import logo from '../../assets/images/cineBite.png';

function Nav() {
  return (
    <div className="nav_box">
      <div>
        <a href="/">
          <img src={logo} alt="cineBite" className="nav_log" />
        </a>
      </div>
      <div className="nav_menu">
        <ul>
          <a href="/search">
            <FaSearch size="25" color="black" />
          </a>
        </ul>
        <ul>
          <a href="/recommend">
            <AiFillLike size="25" color="black" />
          </a>
        </ul>
        <ul>
          <a href="/community">
            <IoChatbubbleEllipses size="25" color="black" />
          </a>
        </ul>
        <ul>
          <a href="/myPage">
            <FaUser size="25" color="black" />
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
