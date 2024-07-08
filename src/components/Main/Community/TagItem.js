import React, { useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import "../../../styles/Main/Community/TagItem.css";

function TagItem(props) {
    const { url } = props;
    const recentTagsUrl = `${url}/tag/list`;
    const popularTagsUrl = `${url}/tag/list/popular`;
    const [tagName, setTagName] = useState("");

    // Fetch data using the custom hook
    const { entities: recentEntities } = useFetchData(recentTagsUrl);
    const { entities: popularEntities } = useFetchData(popularTagsUrl);

    return (
        <div>
            <h3>인기 태그</h3>
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

            <h3>최신 태그</h3>
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

            <h3>Hot Movies</h3>
            <div className="post_tag_div2"></div>
        </div>
    );
}

export default TagItem;
