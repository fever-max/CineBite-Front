import React from "react";
import "../../../../styles/Main/Search/SearchTotal.css";
import useFetchData from "../../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import "../../../../styles/Main/Community/Board.css";
import { useCurrentTime, getTimeAgo } from "../../../../utils/TimeUtil";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { IoIosList } from "react-icons/io";

const SearchTotal = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const popularTagsUrl = `${API_URL}/tag/list/popular`;
  const popularListUrl = `${API_URL}/board/post/popularList`;
  const { entities: popularListEntities } = useFetchData(popularListUrl);
  const { entities: popularEntities } = useFetchData(popularTagsUrl);

  const currentTime = useCurrentTime();

  return (
    <div className="search_total">
      어떤 작품을 찾으시나요?
      {/* 인기태그 */}
      <div>
        <div className="post_content_title">
          <div className="red-dot"></div>
          <div className="tag_content_title">인기 태그</div>
        </div>
        <div className="post_tag_div">
          <ul className="tag-list">
            {popularEntities && popularEntities.length > 0 ? (
              popularEntities.slice().map((item) => (
                <li key={item.tagNo} className="tag-item">
                  <Link to={`/community/list/${item.tagName}`}>
                    #{item.tagName}
                  </Link>
                </li>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </ul>
        </div>
      </div>
      {/* 인기글 */}
      <div className="board_content">
        <div className="post_content">
          <div className="post_content_name">
            <div className="post_content_title">
              <div className="red-dot"></div>
              <div className="post_content_title_sub">인기글</div>
            </div>
            <Link to={"/community/list"}>
              <IoIosList size={25} />
            </Link>
          </div>
          <div className="post_content_sub">
            <ul>
              {popularListEntities && popularListEntities.length > 0 ? (
                popularListEntities.slice().map((item) => (
                  <li key={item.postNo} className="post_content2">
                    <Link to={`/community/${item.postNo}`}>
                      <p className="post_createDate">
                        {getTimeAgo(currentTime, item.createdDate)}
                      </p>
                      <div className="post_sub">
                        <div className="author_content">
                          <div className="title_info">
                            <div>{item.postTitle}</div>
                          </div>
                          <div className="post_info">
                            <div>
                              {item.tagNames &&
                                item.tagNames.map((tag, index) => (
                                  <span key={index} className="post_tag">
                                    #{tag}
                                  </span>
                                ))}
                            </div>
                            <p className="post_author">{item.userId}</p>
                          </div>
                        </div>
                        {item.imgUrl && (
                          <img
                            src={item.imgUrl}
                            className="post_img"
                            alt={item.postTitle}
                          />
                        )}
                      </div>
                      <div className="post_info2">
                        <div className="post_info2_sub">
                          <div className="post_info2_i">
                            <IoEyeSharp />
                          </div>
                          {item.hitCount}
                        </div>
                        <div className="post_info2_sub">
                          <div className="post_info2_i">
                            <BiSolidLike />
                          </div>
                          {item.likeCount}
                        </div>
                        <div className="post_info2_sub">
                          <div className="post_info2_i">
                            <FaComments />
                          </div>
                          {item.commentCount}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <p>게시글을 불러오는 중입니다...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTotal;
