import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Pfp from "../components/Pfp.tsx";
//https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples


interface UserData {
    email: string;
    display_name: string;
    family_name: string;
    avatar_url: string;
}

function Dashboard() {
    const [data, setData] = useState<UserData | null>(null);
    const navigate = useNavigate();
    const [display, setDisplay] = useState("none");

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


    if (!data) {
        return <div className="mx-5 my-10">Načítání...</div>;
    }
    console.log(data)
    const user = data.display_name;
    const date = new Date().toLocaleDateString("cs-CZ");


    return (
        <>
            <div className={"mx-5 my-10"}>
                <div className={"flex flex-row justify-between items-center"}>
                    <div>
                        <span className={"text-gray-600 font-medium"}>{date}</span>
                        <h1 className={"text-gray-950 mt-0.3 text-2xl! w-fit!"}>Vítej {user}</h1>
                    </div>
                    <Pfp avatar={data.avatar_url} setDisplay={setDisplay} />
                </div>
            </div>

            <section
                className={"fixed inset-0 bg-black/50 flex-col justify-end z-50"}
                style={{ display: display }}
            >
                <div className={"bg-white absolute w-full h-100 bottom-0 p-8 rounded border-t-2 border-black"}>
                    <div className={"flex flex-row justify-between items-center"}>
                        <Pfp avatar={data.avatar_url} />
                        <div>
                            <h3 className={"text-gray-950 font-bold text-lg"}>{data.display_name + " " + data.family_name}</h3>
                            <span className={"text-gray-950 text-sm"}>{data.email}</span>
                        </div>
                        <button
                            onClick={() => setDisplay("none")}
                            className={"border-2 w-12 h-12 rounded-lg border-gray-400 cursor-pointer flex items-center justify-center font-bold text-grafit"}
                        >
                            X
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;