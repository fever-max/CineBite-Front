import React from "react";
import { Link } from "react-router-dom";
import "../../../../styles/Main/Search/SearchTotal.css";
import "../../../../styles/Main/Community/Board.css";
import useFetchData from "../../../../hooks/useFetchData";
import { useCurrentTime, getTimeAgo } from "../../../../utils/TimeUtil";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";

const SearchTotal = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const popularTagsUrl = `${API_URL}/tag/list/popular`;
  const popularListUrl = `${API_URL}/board/post/popularList`;
  const { entities: popularListEntities } = useFetchData(popularListUrl);
  const { entities: popularEntities } = useFetchData(popularTagsUrl);

  const currentTime = useCurrentTime();

  const hasData = (data) => data && data.length > 0;

  return (
    <div className="search_total">
      {/* 인기태그 */}
      <div>
        <div>
          <div className="search_tag_title">커뮤니티 인기 태그</div>
        </div>
        <div className="search_tag_sub1">
          <ul className="search-list">
            {hasData(popularEntities) ? (
              popularEntities.slice().map((item) => (
                <li key={item.tagNo}>
                  <div className="search_tag_sub3">
                    <Link to={`/community/list/${item.tagName}`}>
                      <div className="search_tag_icon">
                        <HiOutlineHashtag />
                      </div>
                      {item.tagName}
                    </Link>
                  </div>
                </li>
              ))
            ) : (
              <p>태그를 불러오는 중입니다...</p>
            )}
          </ul>
        </div>
      </div>
      {/* 인기글 */}
      <div>
        <div className="search_content">
          <div className="search_content_name">
            <div className="search_content_title">
              <div>커뮤니티 인기글</div>
            </div>
            <Link to={"/community/list"}>
              <IoIosList size={25} />
            </Link>
          </div>
          <div className="search_content_sub">
            <ul>
              {hasData(popularListEntities) ? (
                popularListEntities.slice().map((item) => (
                  <li key={item.searchNo} className="search_content2">
                    <Link to={`/community/${item.searchNo}`}>
                      <p className="search_createDate">
                        {getTimeAgo(currentTime, item.createdDate)}
                      </p>
                      <div className="search_sub">
                        <div className="author_content">
                          <div className="title_info">
                            <div>{item.searchTitle}</div>
                          </div>
                          <div className="search_info">
                            <div>
                              {item.tagNames &&
                                item.tagNames.map((tag, index) => (
                                  <span key={index} className="search_tag2">
                                    #{tag}
                                  </span>
                                ))}
                            </div>
                            <p className="search_author">{item.userId}</p>
                          </div>
                        </div>
                        {item.imgUrl && (
                          <img
                            src={item.imgUrl}
                            className="search_img"
                            alt={item.searchTitle}
                          />
                        )}
                      </div>
                      <div className="search_info2">
                        <div className="search_info2_sub">
                          <div className="search_info2_i">
                            <IoEyeSharp />
                          </div>
                          {item.hitCount}
                        </div>
                        <div className="search_info2_sub">
                          <div className="search_info2_i">
                            <BiSolidLike />
                          </div>
                          {item.likeCount}
                        </div>
                        <div className="search_info2_sub">
                          <div className="search_info2_i">
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
