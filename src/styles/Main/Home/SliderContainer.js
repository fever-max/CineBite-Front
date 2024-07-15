import styled from 'styled-components';

export const SliderContainer = styled.div`
    .slick-prev:before,
    .slick-next:before {
        display: none;    
    }

    .slick-prev,
    .slick-next {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: #fff;
        z-index: 999; /* Adjust z-index if needed */
        position: absolute; /* Ensure correct positioning */
        font-size: 30px; /* Adjust icon size */
        cursor: pointer; /* Ensure cursor is pointer */
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .slick-prev {
        left: 10px;
    }

    .slick-next {
        right: 10px;
    }
`;
