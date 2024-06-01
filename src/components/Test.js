import React, { useState } from 'react';
import axios from 'axios';
import useFetchData from '../hooks/useFetchData';
import handleChange from '../utils/handleChange';

function Test() {
  //hook 사용
  const apiUrl = `${process.env.REACT_APP_API_URL}/test/findAll`;
  const { entities, fetchData } = useFetchData(apiUrl);

  //인풋 데이터
  const [user, setUser] = useState({
    userId: '',
    userPw: '',
  });

  const handleInputChange = (e) => {
    handleChange(e, setUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/test/save`, user);
      alert('데이터 추가 완료 / ' + response.data);
      fetchData(); //추가후 재로딩
    } catch (error) {
      console.log('데이터 추가 에러: ' + error);
    }
  };

  return (
    <div>
      <h3>데이터 인풋</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" id="userId" value={user.userId} placeholder="아이디" onChange={handleInputChange} />
        <input type="text" id="userPw" value={user.userPw} placeholder="비밀번호" onChange={handleInputChange} />
        <button type="submit">데이터 저장</button>
      </form>
      <div>
        <h2>TestEntity DB</h2>
        {entities.length > 0 ? (
          <ul>
            {entities.map((entity) => (
              <li key={entity.id}>
                아이디: {entity.userId} / 비밀번호: {entity.userPw}
              </li>
            ))}
          </ul>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Test;
