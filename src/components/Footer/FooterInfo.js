import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function FooterInfo() {
    return (
        <div className="footer_info">
            <div>
                <div className="footer_info_title">만든 사람들</div>
                <p>김지은 박진영 박솔</p>
                <p>박지민 윤수인 이혜민</p>
            </div>
            <div>
                <Link to={"https://github.com/fever-max/CineBite-back"}>
                    <FaGithub color="gray" size={30} style={{ marginRight: "10" }} />
                </Link>
                <Link to={"https://github.com/fever-max/CineBite-Front"}>
                    <FaGithub color="gray" size={30} />
                </Link>
            </div>
        </div>
    );
}

export default FooterInfo;
