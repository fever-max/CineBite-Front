import React, { useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import "../../../styles/Main/Community/TagItem.css";

function TagItem(props) {
    const { url } = props;
    const recentTagsUrl = `${url}/tag/list`;
    const popularTagsUrl = `${url}/tag/list/popular`;
    const movieListUrl = `${url}/movie/movieList`;

    const { entities: recentEntities } = useFetchData(recentTagsUrl);
    const { entities: popularEntities } = useFetchData(popularTagsUrl);
    const { entities: movieEntities } = useFetchData(movieListUrl);

    return (
        <div>
            <div className="post_content_title">
                <div className="red-dot"></div>
                <div className="tag_content_title">인기 태그</div>
            </div>

            <div className="post_tag_div">
                <ul className="tag-list">
                    {popularEntities && popularEntities.length > 0 ? (
                        popularEntities.slice().map((item) => (
                            <li key={item.tagNo} className="tag-item">
                                <Link to={`/community/list/${item.tagName}`}>#{item.tagName}</Link>
                            </li>
                        ))
                    ) : (
                        <p>No tags available</p>
                    )}
                </ul>
            </div>

            <div className="tag_content_title">최신 태그</div>
            <div className="post_tag_div">
                <ul className="tag-list">
                    {recentEntities && recentEntities.length > 0 ? (
                        recentEntities.slice().map((item) => (
                            <li key={item.tagNo} className="tag-item">
                                <Link to={`/community/list/${item.tagName}`}>#{item.tagName}</Link>
                            </li>
                        ))
                    ) : (
                        <p>No tags available</p>
                    )}
                </ul>
            </div>

            <div className="post_content_title">
                <div className="red-dot"></div>
                <div className="tag_content_title">Hot Movies</div>
            </div>
            <div className="post_tag_div2">
                <ul className="tag_movieList">
                    {movieEntities && movieEntities.length > 0 ? (
                        movieEntities.slice(0, 4).map((item) => (
                            <li key={item.id}>
                                <Link to={`/movie/${item.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="tag_postImg" />
                                    <div>{item.title}</div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No Movie Data</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TagItem;
