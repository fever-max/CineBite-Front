import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Main/Community/BoardWrite.css';

function BoardWrite() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postTitle: '',
    postContent: '',
    userId: 'test1',
    tagNames: [],
  });

  const [file, setFile] = useState(null);
  const [tagInput, setTagInput] = useState(''); // 태그 입력값
  const [formError, setFormError] = useState('');

  const handleChange = (e, setter) => {
    const { id, value } = e.target;
    setter((prevState) => ({
      ...prevState,
      [id]: id === 'tagNames' ? value.split(',').map((tag) => tag.trim()) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // 태그 추가
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== '') {
      setFormData((prevState) => ({
        ...prevState,
        tagNames: [...prevState.tagNames, tagInput.trim()],
      }));
      setTagInput(''); // 태그 입력값 초기화
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
      return; // 유효성 검사 실패 시 중단
    }

    const formDataAll = new FormData();
    formDataAll.append('dto', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    formDataAll.append('file', file || new Blob(), file);

    try {
      const response = await axios.post(`${apiUrl}/board/post/write`, formDataAll, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('글 저장 완료', response.data);
      if (response.data) {
        navigate('/community');
      }
    } catch (error) {
      console.error('글 저장 오류:', error);
    }
  };

  return (
    <div className="write_content">
      <h2>게시글 작성</h2>
      <div className="write_input">
        <form onSubmit={handleSubmit}>
          <input type="text" id="postTitle" placeholder="제목" value={formData.postTitle} onChange={(e) => handleChange(e, setFormData)} />
          <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
          <textarea id="postContent" placeholder="내용" rows={10} value={formData.postContent} onChange={(e) => handleChange(e, setFormData)} />
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
          <input
            type="text"
            id="tagNames"
            placeholder="태그 입력 후 엔터"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTag(e);
              }
            }}
          />
          <button type="submit" className="write_btn">
            글 저장
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardWrite;
