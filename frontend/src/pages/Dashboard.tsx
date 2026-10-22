import {useState} from "react";
import Pfp from "../components/Pfp.tsx";
import settingsIcon from "../assets/sliders-icon.svg"
import logoutIcon from "../assets/logout.png"
import VerifyUser from "../features/VerifyUser.tsx";
import Logout from "../features/Logout.tsx";
import {useNavigate} from "react-router-dom";
//https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples


function Dashboard() {
    const [display, setDisplay] = useState("none");
    const navigate = useNavigate();

    const data = VerifyUser();

    if (!data) {
        return <div className="mx-5 my-10">Načítání...</div>;
    }
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
                className={"fixed inset-0 bg-black/50 justify-end z-50"}
                style={{ display: display }}
                onClick={()=> setDisplay("none")}
            >
                <div className={"bg-white absolute w-full h-100 bottom-0 p-8 rounded border-t-2 border-black"} onClick={(e) => e.stopPropagation()}>
                    <div className={"flex flex-row justify-between items-center"}>
                        <Pfp avatar={data.avatar_url} />
                        <div>
                            <h3 className={"text-grafit font-bold text-lg"}>{data.display_name + " " + data.family_name}</h3>
                            <span className={"text-grafit text-sm"}>{data.email}</span>
                        </div>
                        <button
                            onClick={() => setDisplay("none")}
                            className={"border-2 w-12 h-12 rounded-lg border-gray-400 cursor-pointer flex items-center justify-center font-bold text-grafit"}
                        >
                            X
                        </button>
                    </div>
                    <div className={"flex flex-row items-center border-t border-b border-gray-400 mt-5 py-3 active:bg-gray-300 select-none"} onClick={() => navigate("/settings")}>
                        <img src={settingsIcon} alt="Settings icon" className={"w-5 mr-5"}/>
                        <p className={"text-grafit font-bold text-xl"}>Nastavení</p>
                    </div>
                    <div className={"flex flex-row items-center border-b border-gray-400 py-3 active:bg-gray-300 select-none"} onClick={() => {Logout(); navigate("/")}}>
                        <img src={logoutIcon} alt="Settings icon" className={"w-5 mr-5"}/>
                        <p className={"text-grafit font-bold text-xl"}>Odhlásit se</p>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Dashboard;