import React, { useState, useEffect } from "react";
import { findRelatedByKeyword } from "./SearchService";

const RelatedList = ({ keyword = "" }) => {
  const [relatedEntities, setRelatedEntities] = useState([]);

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        if (keyword) {
          const response = await findRelatedByKeyword(keyword);
          // 응답 데이터가 유효한지 확인
          if (response && response.data) {
            setRelatedEntities(response.data);
          } else {
            setRelatedEntities([]);
          }
        }
      } catch (error) {
        console.error("연관 검색어 조회 오류:", error);
        setRelatedEntities([]);
      }
    };
    fetchRelatedData();
  }, [keyword]);

  return (
    <div className="related_list">
      <h3>연관검색어</h3>
      <ul className="related_list_data">
        {relatedEntities.map((relatedEntity) => (
          <li key={relatedEntity.searchListNo}>
            {relatedEntity.searchRelatedWord}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedList;
