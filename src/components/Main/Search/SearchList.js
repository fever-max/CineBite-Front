import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchList = () => {

    // 검색어 목록 가져오기
    const [searchKeyword, setSearchKeyword] = useState([]); 
    const [userId, setUserId] = useState('');
    // const userId = 'aaa'; 

    useEffect(() => {
        const fetchSearchList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/user/${userId}`);
                return response.data || [];
            } catch (error) {
                console.error('검색리스트를 가져오는데 실패했습니다.', error)
                setSearchKeyword([]);
            }
        };
        fetchSearchList();
    }, [userId]);

    return (
        <div>
            {/* 최근검색 리스트 */}
            <h3>최근검색어</h3>
        <ul>
        {searchKeyword.length > 0} &&
            {searchKeyword.map(keyword => (
                <li key={keyword.id}>{keyword.keyword}</li>
            ))}
        </ul>

        </div>
    );
};

export default SearchList;