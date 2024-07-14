import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";
import "../../../../styles/Main/Search/CommunityTag.css";

const CommunityTag = ({ tagData }) => {
  return (
    <div>
      <IoIosArrowBack />
      {tagData && tagData.length > 0 ? (
        <div className="community_tag">
          <h2> 검색어와 관련된 커뮤니티 태그</h2>
          <div className="community_tag_sub1">
            {tagData.map((tag, index) => (
              <p key={index} className="community_tag_sub2">
                <div className="community_tag_icon">
                  <HiOutlineHashtag />
                </div>
                {tag.tagNames.map((tagName, tagIndex) => (
                  <span className="community_tag_sub3" key={tagIndex}>
                    #{tagName}{" "}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommunityTag;
