import React from "react";
import "../../../styles/Main/Search/SearchList.css";
import { deleteSearchList, deleteAll } from "./SearchService";
import { TiDeleteOutline } from "react-icons/ti";

const SearchList = ({ searchKeyword, setSearchKeyword }) => {
  const userId = "guest";

  //삭제
  const onDel = async (searchListNo) => {
    await deleteSearchList(userId, searchListNo);
    setSearchKeyword(
      searchKeyword.filter((item) => item.searchListNo !== searchListNo)
    );
    console.log("컴퍼넌트에서 검색어 삭제 성공:", searchListNo);
  };

  //전체삭제
  const onAllDel = async () => {
    await deleteAll(userId);
    setSearchKeyword([]);
    console.log("컴퍼넌트에서 검색어 전체삭제 성공");
  };

  return (
    <div>
      <div className="search_list">
        <h3>최근검색어</h3>
        <span className="delete_all" onClick={onAllDel}>
          전체삭제
        </span>
      </div>
      <ul className="search_list_data">
        {searchKeyword.length > 0 ? (
          searchKeyword.map((searchData) => (
            <li key={searchData.searchListNo}>
              {searchData.searchKeyword}
              <span
                className="delete"
                onClick={() => onDel(searchData.searchListNo)}
              >
                <TiDeleteOutline />
              </span>
            </li>
          ))
        ) : (
          <li>최근 검색어가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchList;
