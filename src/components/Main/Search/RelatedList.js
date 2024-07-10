import React from "react";

const RelatedList = ({ relatedKeywords }) => {
  return (
    <div>
      <h2>연관 검색어:</h2>
      <ul>
        {relatedKeywords.map((relatedKeywords) => (
          <li key={relatedKeywords.searchListNo}>
            {relatedKeywords.searchRelatedWord}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedList;
