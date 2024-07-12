import React from "react";
import "../../../styles/Main/Search/RelatedList.css";

const RelatedList = ({ relatedKeywords = [] }) => {
  // 중복제거
  const uniqueKeywords = [
    ...new Set(
      relatedKeywords.map((keywordList) => keywordList.searchRelatedWord)
    ),
  ];

  return (
    <div className="related_list">
      <ul>
        {uniqueKeywords.map((keyword) => {
          const relatedKeyword = relatedKeywords.find(
            (item) => item.searchRelatedWord === keyword
          );
          const { searchListNo, searchKeyword } = relatedKeyword || {};

          return (
            relatedKeyword && (
              <li key={searchListNo}>
                {searchKeyword} {keyword}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedList;
