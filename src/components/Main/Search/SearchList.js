import React from "react";
import "../../../styles/Main/Search/SearchList.css";
import { deleteSearchList, deleteAll } from "./SearchService";
import RelatedList from "./RelatedList";

const SearchList = ({ searchKeyword, setSearchKeyword, relatedKeywords }) => {
  const userId = "guest";

  // 검색어 삭제
  const onDel = async (searchListNo) => {
    await deleteSearchList(userId, searchListNo);
    setSearchKeyword(
      searchKeyword.filter((item) => item.searchListNo !== searchListNo)
    );
    console.log("컴퍼넌트에서 검색어 삭제 성공:", searchListNo);
  };

  // 전체 검색어 삭제
  const onAllDel = async () => {
    await deleteAll(userId);
    setSearchKeyword([]);
    console.log("컴퍼넌트에서 검색어 전체 삭제 성공");
  };

  return (
    <div className="search_box">
      <div className="search_list">
        <h3>최근검색어</h3>
        <span className="delete_all" onClick={onAllDel}>
          전체삭제
        </span>
      </div>
      <ul className="search_list_data">
        {searchKeyword.length > 0 ? (
          searchKeyword.slice(0, 10).map((searchData) => (
            <li key={searchData.searchListNo} className="search_list_keywords">
              {searchData.searchKeyword}
              <span
                className="delete"
                onClick={() => onDel(searchData.searchListNo)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </span>
            </li>
          ))
        ) : (
          <span className="searchList_ment">어떤 작품을 찾으세요?</span>
        )}
      </ul>
      {relatedKeywords.length > 0 && (
        <div>
          <RelatedList relatedKeywords={relatedKeywords} />
        </div>
      )}
    </div>
  );
};

export default SearchList;
