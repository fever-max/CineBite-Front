import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
  //인풋 데이터
  const [user, setUser] = useState({
    userId: '',
    userPw: '',
  });

  //db 데이터
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/test`, user);
      alert('데이터 추가 완료 / ' + response.data);
      fetchData();
    } catch (error) {
      console.log('데이터 추가 에러: ' + error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/test`);
      setEntities(response.data);
    } catch (error) {
      console.error('데이터 불러오기 에러:', error);
    }
  };

  return (
    <div>
      <h3>데이터 인풋</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" id="userId" value={user.userId} placeholder="아이디" onChange={handleChange} />
        <input type="text" id="userPw" value={user.userPw} placeholder="비밀번호" onChange={handleChange} />
        <button type="submit">데이터 저장</button>
      </form>
      <div>
        <h2>TestEntity DB</h2>
        <ul>
          {entities.map((entity) => (
            <li key={entity.id}>
              아이디: {entity.userId} / 이름: {entity.userPw}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Test;
