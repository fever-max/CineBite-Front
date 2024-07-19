import React from "react";
import { CiSquareQuestion } from "react-icons/ci";
import "../../../styles/Main/Search/RelatedList.css";

const RelatedList = ({ relatedKeywords = [] }) => {
  // 중복제거
  const uniqueKeywords = [
    ...new Set(
      relatedKeywords.map((keywordList) => keywordList.searchRelatedWord)
    ),
  ];

  return (
    <div>
      <h3>
        연관검색어
        <CiSquareQuestion size={30} className="related_icon" />
      </h3>
      <div className="related_list">
        <ul>
          {uniqueKeywords.slice(0, 8).map((keyword) => {
            const relatedKeyword = relatedKeywords.find(
              (item) => item.searchRelatedWord === keyword
            );
            const { searchListNo, searchKeyword } = relatedKeyword || {};

            return (
              relatedKeyword && (
                <li key={searchListNo}>
                  <span className="related_mainKeyword1">{searchKeyword}</span>{" "}
                  <span className="related_mainKeyword2">{keyword}</span>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RelatedList;
