import React from "react";
import "../../../../styles/Main/Search/SearchTotal.css";
const SearchTotal = () => {
  return (
    <div className="total">
      {/* 메뉴 tab - 통합검색 */}
      <ul className="total_menu">
        <li className="total_item">
          <h3>통합</h3>
        </li>
        <li className="total_item">
          <h3>작품</h3>
        </li>
        <li className="total_item">
          <h3>커뮤니티</h3>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default SearchTotal;
