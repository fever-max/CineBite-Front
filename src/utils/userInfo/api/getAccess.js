import { useEffect } from "react";
import { getAccessToken } from "./reissue";

function GetAccess() { // refresh 토큰으로 access 토큰 요청

    useEffect(() => {
        const fetchAccessToken = async () => {
            await getAccessToken();
            window.location.href = '/';
        };
        fetchAccessToken();
    });
}

export default GetAccess;