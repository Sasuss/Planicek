import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import Icon from "../assets/IconInverted.png";

function Home() {
    const navigate = useNavigate();

    const handleSuccess = async (response: CredentialResponse) => {
        if (!response.credential) return;
        try {
            const res = await fetch("/api/authenticate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({credential: response.credential}),
            });
            if (!res.ok) {
                console.error("login failed:", res.status);
                return;
            }
            navigate("/dashboard");
        } catch (err) {
            console.error("login error:", err);
        }
    };

    return (
        <>
            <div className="bg-grafit h-1/2 w-full pt-20">
                <div className={"ml-10 mr-10"}>
                    <img src={Icon} alt="icon" className={"w-20 h-20 rounded-lg"} />
                    <h1 className="text-white my-5">Pláníček</h1>
                    <p className={"text-white mb-6"}>
                        Webová aplikace pro plánování akcí a termínů
                    </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non enim id ligula feugiat suscipit eleifend nec quam. Suspendisse id egestas tortor.</p>
                </div>
            </div>

            <section id="center">
                <GoogleLogin
                    use_fedcm_for_button={true}
                    onSuccess={handleSuccess}
                    onError={() => console.error("Google login failed")}
                />
            </section>
        </>
    )
}

export default Home