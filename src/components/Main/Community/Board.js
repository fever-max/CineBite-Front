import React from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import "../../../styles/Main/Community/Board.css";
import { useCurrentTime, getTimeAgo } from "../../../utils/TimeUtil";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import TagItem from "./TagItem";
import { IoIosList } from "react-icons/io";

function Board() {
    const url = process.env.REACT_APP_API_URL;
    const recentListUrl = `${url}/board/post/recentList`;
    const popularListUrl = `${url}/board/post/popularList`;
    const { entities: popularEntities } = useFetchData(popularListUrl);
    const { entities: recentEntities } = useFetchData(recentListUrl);

    const currentTime = useCurrentTime();

    return (
        <div className="board_content">
            <div className="post_content">
                <div>
                    <div className="post_content_name">
                        <div className="post_content_title">
                            <div className="red-dot"></div>
                            <div className="post_content_title_sub">인기글</div>
                        </div>
                    </div>
                    <div className="post_content_sub">
                        <ul>
                            {popularEntities && popularEntities.length > 0 ? (
                                popularEntities.slice().map((item) => (
                                    <li key={item.postNo} className="post_content2">
                                        <Link to={`/community/${item.postNo}`}>
                                            <p className="post_createDate">{getTimeAgo(currentTime, item.createdDate)}</p>
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
                                                {item.imgUrl && <img src={item.imgUrl} className="post_img" alt={item.postTitle} />}
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
                <div className="post_content_name">
                    <div className="post_content_title_sub">최신글</div>
                    <Link to={"/community/list"}>
                        <IoIosList size={25} />
                    </Link>
                </div>
                <div className="post_content_sub">
                    <ul>
                        {recentEntities && recentEntities.length > 0 ? (
                            recentEntities.slice().map((item) => (
                                <li key={item.postNo} className="post_content2">
                                    <Link to={`/community/${item.postNo}`}>
                                        <p className="post_createDate">{getTimeAgo(currentTime, item.createdDate)}</p>
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
                                            {item.imgUrl && <img src={item.imgUrl} className="post_img" alt={item.postTitle} />}
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
                                                    <FaComments />{" "}
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
            <div className="sub_content">
                <Link to={"/community/write"}>
                    <button className="post_btn">
                        <div className="post_pen">글 작성</div> <FaPencil />
                    </button>
                </Link>
                <TagItem url={url} />
            </div>
        </div>
    );
}

export default Board;
