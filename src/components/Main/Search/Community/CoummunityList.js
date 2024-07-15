import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import "../../../../styles/Main/Search/CommunityList.css";
import { Link } from "react-router-dom";

const CommunityList = ({
  communityTitle,
  communityContent,
  communityUserId,
  submittedKeyword,
}) => {
  // 데이터 체크
  const hasCommunityData =
    communityTitle.length > 0 ||
    communityContent.length > 0 ||
    communityUserId.length > 0;

  if (
    !Array.isArray(communityTitle) ||
    !Array.isArray(communityContent) ||
    !Array.isArray(communityUserId)
  ) {
    console.error("배열이 아닙니다.");
    return null;
  }

  // 중복 제거
  const uniquePosts = new Set([
    ...communityTitle,
    ...communityContent,
    ...communityUserId,
  ]);

  return (
    <div className="community_total">
      <h2>[커뮤니티] 검색결과</h2>
      {uniquePosts.size === 0 ? (
        <div className="search_result">
          <p>
            <span className="keyword">"{submittedKeyword}"</span>에 대한 검색
            결과가 없어요.
          </p>
          <p>다시 한번 확인해주세요.</p>
        </div>
      ) : (
        <>
          {hasCommunityData && <h2>커뮤니티 게시글</h2>}
          {Array.from(uniquePosts).map((post, index) => (
            <div key={index} className="community_list_total">
              <Link to={`/community/${post.postNo}`}>
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
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CommunityList;
