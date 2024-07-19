import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const ArrowButton = ({ className, style, onClick, direction }) => (
    <div
        className={className}
        style={{
            ...style,
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            zIndex: 9999, // Ensure it's above other elements
            fontSize: '30px'
        }}
        onClick={onClick}
    >
        {direction === 'prev' ? <FaChevronLeft /> : <FaChevronRight />}
    </div>
);