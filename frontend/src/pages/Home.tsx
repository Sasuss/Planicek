import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/IconInverted.png";

const GOOGLE_CLIENT_ID = "463986232644-712ajfdttp89jv2ld3hrdq8klvo936if.apps.googleusercontent.com";
const GSI_SRC = "https://accounts.google.com/gsi/client";

interface GoogleCredentialResponse {
    credential: string;
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: {
                        client_id: string;
                        ux_mode: "popup" | "redirect";
                        callback: (response: GoogleCredentialResponse) => void;
                    }) => void;
                    renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
                };
            };
        };
    }
}

function Home() {
    const buttonRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {

        const handleCredential = async (response: GoogleCredentialResponse) => {
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

        const init = () => {
            if (!window.google || !buttonRef.current) return;
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                ux_mode: "popup",
                callback: handleCredential,
            });
            window.google.accounts.id.renderButton(buttonRef.current, {
                type: "standard",
                shape: "rectangular",
                theme: "outline",
                text: "signin_with",
                size: "large",
                logo_alignment: "left",
            });
        };

        if (window.google) {
            init();
            return;
        }

        let script = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`);
        if (!script) {
            script = document.createElement("script");
            script.src = GSI_SRC;
            script.async = true;
            document.head.appendChild(script);
        }
        script.addEventListener("load", init);
        return () => script.removeEventListener("load", init);
    }, [navigate]);

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
                <div ref={buttonRef}></div>
            </section>

        </>
    )
}

export default Home
