import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import "../../../../styles/Main/Search/CommunityList.css";

const CoummunityList = ({
  communityTitle,
  communityContent,
  communityUserId,
}) => {
  // 중복 제거를 위해 Set을 사용하여 유니크한 게시글 객체들을 저장
  const uniquePosts = new Set([
    ...communityTitle,
    ...communityContent,
    ...communityUserId,
  ]);

  return (
    <div className="community_total">
      {uniquePosts.size > 0
        ? Array.from(uniquePosts).map((post, index) => (
            <div key={index} className="community_list_total">
              <h2>커뮤니티 게시글</h2>
              <div className="community_list">
                <div className="community_info">
                  <h3>{post.postTitle}</h3>
                  <div className="community_info_stats">
                    <div className="community_info_sub">
                      <IoEyeSharp />
                      <div>{post.hitCount}</div>
                    </div>
                    <div className="community_info_sub">
                      <BiSolidLike />
                      <div>{post.likeCount}</div>
                    </div>
                    <div className="community_info_sub">
                      <FaComments />
                      <div>{post.commentCount}</div>
                    </div>
                  </div>
                </div>
                <div className="community_info_img">
                  {post.imgUrl && (
                    <img
                      src={post.imgUrl}
                      className="community_img"
                      alt={post.postTitle}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default CoummunityList;
