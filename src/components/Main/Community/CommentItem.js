import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetchData from "../../../hooks/useFetchData";
import "../../../styles/Main/Community/CommentItem.css";
import ReplyItem from "./ReplyItem";
import { useCurrentTime, getTimeAgo } from "../../../utils/TimeUtil";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

function CommentItem(props) {
    const { postNo, apiUrl, commentCount } = props;
    const commentUrl = `${apiUrl}/board/post/${postNo}/comment`;
    const { entities, fetchData } = useFetchData(commentUrl);
    const currentTime = useCurrentTime();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [formComment, setFormComment] = useState({
        userId: "test4",
        content: "",
    });
    const [formEdit, setFormEdit] = useState({
        commentNo: null,
        userId: "",
        content: "",
    });

    const handleContentChange = (e) => {
        setFormEdit({
            ...formEdit,
            content: e.target.value,
        });
    };

    const handleCommentChange = (e) => {
        setFormComment({
            ...formComment,
            content: e.target.value,
        });
    };

    const handleEditClick = (commentNo, content, userId) => {
        setFormEdit({
            commentNo: commentNo,
            content: content,
            userId: userId,
        });
    };

    const handleCancelEdit = () => {
        setFormEdit({
            commentNo: null,
            userId: "",
            content: "",
        });
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${apiUrl}/board/post/${postNo}/comment/${formEdit.commentNo}`, formEdit);
            console.log("댓글 수정 성공: ", response.data);
            setFormEdit({
                commentNo: null,
                content: "",
                userId: "",
            });
            fetchData();
        } catch (error) {
            console.error("댓글 수정 에러: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("전송하는 코멘트: " + formComment.content);
            const response = await axios.post(`${apiUrl}/board/post/${postNo}/comment`, formComment);
            console.log("댓글 저장 성공: ", response.data);
            setFormComment({
                ...formComment,
                content: "",
            });
            fetchData();
        } catch (error) {
            console.error("댓글 저장 에러: ", error);
        }
    };

    const handleDeleteClick = async (commentNo) => {
        const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`${apiUrl}/board/post/${postNo}/comment/${commentNo}`);
                console.log("댓글 삭제 성공: ", response.data);
                fetchData();
            } catch (error) {
                console.error("댓글 삭제 에러: ", error);
            }
        }
    };

    return (
        <div>
            <h4>댓글({commentCount})</h4>
            <div className="commentItem_div_content">
                {entities.length > 0 ? (
                    entities.map((item) => (
                        <div key={item.commentNo} className="comment_div">
                            <div className="comment_title">
                                <div className="comment_id">{item.userId}</div>
                                <div className="comment_date">{item.updateDate ? <>{getTimeAgo(currentTime, item.updateDate)} (수정)</> : getTimeAgo(currentTime, item.createDate)}</div>
                            </div>
                            {formEdit.commentNo === item.commentNo ? (
                                <form onSubmit={handleSubmitEdit}>
                                    <textarea placeholder="댓글 수정" id="content" value={formEdit.content} onChange={handleContentChange} wrap="hard" />
                                    <div className="commentItem_editBtns">
                                        <button type="submit">수정 완료</button>
                                        <button type="button" onClick={handleCancelEdit}>
                                            취소
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="comment_content">{item.content.replace(/<br>/g, "\n")}</div>
                                    <div className="commentItem_editBtns">
                                        <button onClick={() => setShowReplyForm((prevState) => (prevState === item.commentNo ? null : item.commentNo))} className="commentItem_toggle">
                                            {showReplyForm === item.commentNo ? <FaDeleteLeft /> : <IoIosAddCircle />}
                                        </button>
                                        <button onClick={() => handleEditClick(item.commentNo, item.content, item.userId)}>수정</button>
                                        <button onClick={() => handleDeleteClick(item.commentNo)}>삭제</button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <ReplyItem commentNo={item.commentNo} apiUrl={apiUrl} showReplyForm={showReplyForm === item.commentNo} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="comment_write_div">
                        <textarea id="content" value={formComment.content} onChange={handleCommentChange} wrap="hard" />
                        <button type="submit">등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CommentItem;
