import useFetchData from "../../../hooks/useFetchData";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/Main/Community/BoardItem.css";
import CommentItem from "./CommentItem";
import { useCurrentTime, getTimeAgo } from "../../../utils/TimeUtil";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { useUserData } from "../../../utils/userInfo/api/userApi";

function BoardItem() {
    const { userData } = useUserData();
    const { postNo } = useParams();
    const navigate = useNavigate();
    console.log("postNo:" + postNo);
    const apiUrl = process.env.REACT_APP_API_URL;
    const postUrl = `${apiUrl}/board/post/${postNo}`;
    const currentTime = useCurrentTime();
    const { entities, setEntities } = useFetchData(postUrl);
    const [isLiked, setIsLiked] = useState(false);
    const userId = userData?.userId;

    const editBtn = () => {
        navigate("/community/edit/" + postNo);
    };

    const deleteBtn = async () => {
        const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`${apiUrl}/board/post/delete/${postNo}`);
                if (response) {
                    console.log("게시글 삭제 성공");
                    navigate("/community");
                }
            } catch (error) {
                console.log("게시글 삭제 에러: ", error);
            }
        }
    };

    const likeBtn = async () => {
        try {
            const response = await axios.get(`${apiUrl}/like/post/${postNo}/${userId}`);
            if (response) {
                console.log(response.data);
                if (isLiked) {
                    setIsLiked(false);
                    setEntities((prevEntities) => ({
                        ...prevEntities,
                        likeCount: prevEntities.likeCount - 1,
                    }));
                } else {
                    setIsLiked(true);
                    setEntities((prevEntities) => ({
                        ...prevEntities,
                        likeCount: prevEntities.likeCount + 1,
                    }));
                }
            }
        } catch (error) {
            console.log("개시글 좋아요 에러:", error);
        }
    };

    if (!entities) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <div>
            <div className="boardItem_btns">
                {userId === entities.userId && (
                    <>
                        <button onClick={editBtn} className="boardItem_btn">
                            글수정
                        </button>
                        <button onClick={deleteBtn} className="boardItem_btn">
                            글삭제
                        </button>
                    </>
                )}
            </div>
            <div className="boardItem_div">
                <div className="boardItem_content">
                    <div className="boardItem_userInfo">
                        <div className="boardItem_userInfo_sub">
                            <div className="boardItem_userImg"></div>
                            <div>{entities.userId}</div>
                        </div>
                        <div>{getTimeAgo(currentTime, entities.createdDate)}</div>
                    </div>

                    <h2>{entities.postTitle}</h2>
                    {entities.imgUrl && <img src={entities.imgUrl} alt={entities.postTitle} className="itemImg" />}
                    <div className="boardItem_content">{entities.postContent ? entities.postContent.replace(/<br>/g, "\n") : "내용이 없습니다."}</div>

                    <div>
                        {entities.tagNames
                            ? entities.tagNames.map((tag, index) => (
                                  <span key={index} className="boardItem_tag">
                                      #{tag}
                                  </span>
                              ))
                            : ""}
                    </div>

                    <div className="boardItem_infos">
                        <div className="boardItem_infos_sub">
                            <div className="boardItem_info_i">
                                <IoEyeSharp />
                            </div>
                            {entities.hitCount}
                        </div>
                        <div className="boardItem_infos_sub" onClick={likeBtn}>
                            <div className="boardItem_info_i">
                                <BiSolidLike />
                            </div>
                            {entities.likeCount}
                        </div>
                        <div className="boardItem_infos_sub">
                            <div className="boardItem_info_i">
                                <FaComments />
                            </div>
                            {entities.commentCount}
                        </div>
                    </div>
                </div>
                <div>
                    <CommentItem postNo={postNo} apiUrl={apiUrl} commentCount={entities.commentCount} />
                </div>
            </div>
        </div>
    );
}

export default BoardItem;
