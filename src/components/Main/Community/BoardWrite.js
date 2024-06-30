import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../styles/Main/Community/BoardWrite.css';

function BoardWrite() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { postNo } = useParams();
  const [formData, setFormData] = useState({
    postTitle: '',
    postContent: '',
    userId: 'test1',
    tagNames: [],
  });
  const [file, setFile] = useState(null);
  const [tagInput, setTagInput] = useState(''); // 태그 입력값
  const [imageUrl, setImageUrl] = useState(''); // 이미지 URL
  const [deleteImage, setDeleteImage] = useState(false); // 사진 삭제 여부

  useEffect(() => {
    if (postNo) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/board/post/${postNo}`);
          setFormData({
            postTitle: response.data.postTitle || '',
            postContent: response.data.postContent || '',
            userId: response.data.userId || 'test1',
            tagNames: response.data.tagNames || [],
          });
          setImageUrl(response.data.imgUrl || '');
        } catch (error) {
          console.error('데이터 불러오기 에러:', error);
        }
      };
      fetchData();
    }
  }, [postNo, apiUrl]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: id === 'tagNames' ? value.split(',').map((tag) => tag.trim()) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
      setDeleteImage(false); // 새 이미지를 선택하면 이미지 삭제 상태를 해제
    }
  };

  const handleImageDelete = () => {
    setFile(null);
    setImageUrl('');
    setDeleteImage(true); // 이미지 삭제 상태로 설정
  };

  // 태그 추가
  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmedTag = tagInput.trim();
    if (trimmedTag !== '') {
      setFormData((prevState) => ({
        ...prevState,
        tagNames: [...prevState.tagNames, trimmedTag],
      }));
      setTagInput(''); // 태그 입력값 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지
      handleAddTag(e);
    }
  };

  // 태그 삭제
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      tagNames: prevState.tagNames.filter((tag) => tag !== tagToRemove),
    }));
  };

  // 폼 유효성 검사
  const validateForm = () => {
    if (formData.postTitle.trim() === '' || formData.postContent.trim() === '') {
      alert('제목과 내용은 필수 입력 사항입니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataAll = new FormData();
    formDataAll.append('dto', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    formDataAll.append('file', file || new Blob(), file);
    formDataAll.append('deleteImage', deleteImage);

    try {
      const url = postNo ? `${apiUrl}/board/post/modify/${postNo}` : `${apiUrl}/board/post/write`;
      let response;

      if (postNo) {
        response = await axios.patch(url, formDataAll, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data) {
          console.log('글 수정 완료', response.data);
          navigate(`/community/${postNo}`);
        }
      } else {
        response = await axios.post(url, formDataAll, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('글 저장 완료', response.data);
        if (response.data) {
          navigate('/community');
        }
      }
    } catch (error) {
      console.error(postNo ? '글 수정 오류:' : '글 저장 오류:', error);
    }
  };

  return (
    <div className="write_content">
      <h2>Community</h2>
      <div className="write_input">
        <form onSubmit={handleSubmit}>
          <input type="text" id="postTitle" placeholder="제목" value={formData.postTitle} onChange={handleChange} />
          {imageUrl ? <img src={imageUrl} alt="Uploaded" className="edit_img" /> : null}

          <label htmlFor="file-upload" className="imgAdd">
            {postNo ? '이미지 변경' : '이미지 선택'}
          </label>
          {postNo && (
            <label type="button" onClick={handleImageDelete} className="imgAdd">
              이미지 삭제
            </label>
          )}
          <input id="file-upload" type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} style={{ display: 'none' }} />
          <textarea id="postContent" placeholder="내용" rows={10} value={formData.postContent} onChange={handleChange} wrap="hard" />
          <div className="tag_container">
            {formData.tagNames.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
          <input type="text" id="tagNames" placeholder="태그 입력 후 엔터" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleKeyDown} />
          <button type="submit" className="write_btn">
            {postNo ? '글 수정' : '글 저장'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardWrite;
