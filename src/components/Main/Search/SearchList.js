import React, { useEffect, useState } from 'react';
import { fetchSearchList } from './SearchService';
import '../../../styles/Main/Search/SearchList.css';

const SearchList = () => {
    const [searchKeyword, setSearchKeyword] = useState([]);

    useEffect(() => {
        // 추후 userId 변경 예정
        const userId = 'guest';

        const fetchSearchData = async () => {
            const searchData = await fetchSearchList(userId);
            setSearchKeyword(searchData);
        };

        fetchSearchData();
    }, []);

    return (
        <div>
            {/* - todo: 최근검색순으로 정렬해야함  */}
            {/* - todo: 새로 검색 시, 최근검색어 업데이트 반영 */}
            {/* - 지금은 f5눌러야 업데이트됨 */}
            <h3>최근검색어</h3>
            <ul>
                {searchKeyword.length > 0 && (
                    searchKeyword.map((searchData, index) => (
                        <li key={index}>{searchData.searchKeyword}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SearchList;
