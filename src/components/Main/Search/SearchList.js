import React, { useEffect, useState } from 'react';
import { fetchSearchData } from './SearchService';
import '../../../styles/Main/Search/SearchList.css';

const SearchList = ({ userId , searchKeyword ,setSearchKeyword }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchSearchData(userId, setSearchKeyword);
            } catch (error) {
                console.error('최근 검색어를 가져오는데 실패했습니다.', error);
                setSearchKeyword([]);
            }
            setLoading(false); 
        };
    
        fetchData();
    }, [userId]);


    // -todo : 삭제 / 전체 삭제

    return (
        <div>
            <h3>최근검색어</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                    <ul>
                        {searchKeyword.length > 0 ? (
                            searchKeyword.map((searchData) => (
                                <li key={searchData.searchListNo}>
                                    {searchData.searchKeyword}
                                </li>
                            ))
                        ) : (
                            <li>최근 검색어가 없습니다.</li>
                        )}
                </ul>
            )}
        </div>
    );
};

export default SearchList;
