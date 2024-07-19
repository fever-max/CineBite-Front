import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Main/Recommend/FavoriteListRecommend.css';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;

    // 한 번에 3페이지씩 보여주도록 startPage와 endPage 계산
    const startPage = Math.floor((currentPage - 1) / maxPageNumbersToShow) * maxPageNumbersToShow + 1;
    const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {startPage > 1 && (
                <button onClick={() => handlePageChange(startPage - maxPageNumbersToShow)}>
                    이전
                </button>
            )}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={number === currentPage ? 'active' : ''}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </button>
            ))}
            {endPage < totalPages && (
                <button onClick={() => handlePageChange(endPage + 1)}>
                    다음
                </button>
            )}
        </div>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
