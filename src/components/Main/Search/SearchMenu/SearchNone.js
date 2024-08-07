import React from "react";
import "../../../../styles/Main/Search/SearchNone.css";
import { BiSolidTachometer } from "react-icons/bi";
import { HiMiniHandThumbUp } from "react-icons/hi2";
import { Link } from "react-router-dom";

const SearchNone = () => {
  return (
    <div className="search_none">
      <div className="search_none_title">
        <Link to={"/"}>
          <button className="button">
            <BiSolidTachometer className="total_icon" />
          </button>
          <span>메인</span>
        </Link>
      </div>
      <div className="search_none_title">
        <Link to={"/recommend"}>
          <button className="button">
            <HiMiniHandThumbUp className="total_icon" size={25} />
          </button>
          <span>추천</span>
        </Link>
      </div>
      <div className="search_none_title">
        <Link to={"/favoriteList"}>
          <button className="button">
            <svg viewBox="0 0 448 512" className="bell">
              <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
            </svg>
          </button>
          <span>즐겨찾기</span>
        </Link>
      </div>
    </div>
  );
};

export default SearchNone;
