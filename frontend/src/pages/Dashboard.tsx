import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
//https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

function Dashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/api/authenticate/verify_user", {method: "POST"})
            .then(async res => {
                if (!res.ok) {
                    navigate("/");
                    return
                }
                const data = await res.json();
                setData(data);
            })
            .catch(err => {console.error("fetch error:", err); navigate("/")});
    }, []);

    console.log(data)
    if (!data) {
        return <div className="mx-5 my-10">Načítání...</div>;
    }

    const user = data["display_name"]
    const date = new Date().toLocaleDateString("cs-CZ");


    return (
        <>
            <div className={"mx-5 my-10"}>
                <div className={"flex flex-row justify-between vertical-align-center"}>
                    <div>
                        <span className={"text-gray-600 font-medium"}>{date}</span>
                        <h1 className={"text-gray-950 mt-0.3 text-3xl! w-fit!"}>Vítej {user}</h1>
                    </div>

                    <div className={`w-15 h-15 rounded-full bg-black bg-center bg-cover bg-[url(${data["avatar_url"]})]`}></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;