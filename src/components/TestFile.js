import React, { useState } from 'react';
import axios from 'axios';
import useFetchData from '../hooks/useFetchData';
import handleInputChange from '../utils/handleInputChange';
import handleFileChange from '../utils/handleFileChange';

function TestFile() {
  //hook 사용
  const apiUrl = `${process.env.REACT_APP_API_URL}/test/findImg`;
  const { entities, fetchData } = useFetchData(apiUrl);

  const [file, setFile] = useState(null);
  const [imgText, setImgText] = useState('');

  const handleTextChange = (e) => handleInputChange(e, setImgText);
  const handleFileInputChange = (e) => handleFileChange(e, setFile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('imgText', imgText);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/test/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchData();

      //인풋칸 리셋
      setFile(null);
      setImgText('');
      e.target.reset();

      alert(response.data);
    } catch (e) {
      console.log('파일 업로드 실패' + e);
      alert('업로드 실패');
    }
  };

  return (
    <div>
      <h3>이미지 파일 업로드</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" id="imgText" value={imgText} placeholder="이미지 텍스트" onChange={handleTextChange} />
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">파일 업로드</button>
      </form>

      <h3>업로드 된 이미지</h3>
      {entities.length > 0 ? (
        <ul>
          {entities.map((entity) => (
            <li key={entity.id}>
              {entity.imgText}
              <img src={entity.imgUrl} alt="file" style={{ width: '200px', height: 'auto' }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>파일이 없습니다.</p>
      )}
    </div>
  );
}

export default TestFile;
