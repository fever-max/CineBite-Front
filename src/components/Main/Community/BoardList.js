import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCurrentTime, getTimeAgo } from "../../../utils/TimeUtil";
import "../../../styles/Main/Community/BoardList.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import axios from "axios";
import ReactPaginate from "react-paginate";

function BoardList() {
    const url = process.env.REACT_APP_API_URL;
    const boardList = `${url}/board/post/list`;
    const { tagName } = useParams();
    const { entities: boardEntities } = useFetchData(boardList);
    const currentTime = useCurrentTime();
    const [boardData, setBoardData] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        if (tagName) {
            const fetchData = async () => {
                try {
                    console.log("tagName: " + tagName);
                    const response = await axios.post(`${url}/tag/list/post`, { tagName });
                    console.log("##response: ", response.data);
                    setBoardData(response.data);
                } catch (error) {
                    console.error("태그 데이터 불러오기 에러:", error);
                }
            };
            fetchData();
        }
    }, [tagName, url]);

    const dataToDisplay = tagName ? boardData : boardEntities;

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataToDisplay ? dataToDisplay.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = Math.ceil((dataToDisplay ? dataToDisplay.length : 0) / itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div>
            <ul className="boardList_content">
                <div className="boardList_title">
                    <IoIosArrowBack />
                    <h3>{tagName ? `#${tagName} 검색 결과` : "전체글"}</h3>
                    <Link to={"/community/write"}>
                        <button className="write_btn">글쓰기</button>
                    </Link>
                </div>

                {dataToDisplay && dataToDisplay.length > 0 ? (
                    currentItems
                        .slice()
                        .reverse()
                        .map((item) => (
                            <li key={item.postNo} className="boardList_content_sub">
                                <Link to={`/community/${item.postNo}`}>
                                    <p className="boardList_createDate">{getTimeAgo(currentTime, item.createdDate)}</p>
                                    <div className="boardList_sub">
                                        <div className="boardList_author_content">
                                            <div>
                                                <div></div>
                                                <div>{item.userId}</div>
                                            </div>
                                            <div>
                                                <div>{item.postTitle}</div>
                                                <div>{item.postContent}</div>
                                                <div>{item.tagNames && item.tagNames.map((tag, index) => <span key={index}>#{tag} </span>)}</div>
                                            </div>
                                        </div>
                                        {item.imgUrl && <img src={item.imgUrl} className="boardList_img" alt={item.postTitle} />}
                                    </div>
                                    <div className="boardList_info2">
                                        <div className="boardList_info2_sub">
                                            <div>
                                                <IoEyeSharp />
                                            </div>
                                            <div>{item.hitCount}</div>
                                        </div>
                                        <div className="boardList_info2_sub">
                                            <div>
                                                <BiSolidLike />
                                            </div>
                                            <div>{item.likeCount}</div>
                                        </div>
                                        <div className="boardList_info2_sub">
                                            <div>
                                                <FaComments />
                                            </div>
                                            <div>{item.commentCount}</div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                ) : (
                    <p></p>
                )}
            </ul>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <ReactPaginate
                        previousLabel={"이전"}
                        nextLabel={"다음"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            )}
        </div>
    );
}

export default BoardList;
