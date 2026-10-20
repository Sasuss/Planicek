import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface UserData {
    email: string;
    display_name: string;
    family_name: string;
    avatar_url: string;
}

function VerifyUser() {
    const [data, setData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/authenticate/verify_user", {method: "POST"})
            .then(async res => {
                if (!res.ok) {
                    navigate("/");
                    return
                }
                const data: UserData = await res.json();
                setData(data);
            })
            .catch(err => {console.error("fetch error:", err); navigate("/")});
    }, []);

    return data;
}

export default VerifyUser;