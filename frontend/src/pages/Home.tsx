import Icon from "../assets/IconInverted.png";

function Home() {

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

            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <script src="https://accounts.google.com/gsi/client" async></script>
            <section id="center">

                <div id="g_id_onload"
                     data-client_id="463986232644-712ajfdttp89jv2ld3hrdq8klvo936if.apps.googleusercontent.com"
                     data-context="signin"
                     data-ux_mode="redirect"
                     data-login_uri="/api/authenticate"
                     data-auto_prompt="false">
                </div>

                <div className="g_id_signin"
                     data-type="standard"
                     data-shape="rectangular"
                     data-theme="outline"
                     data-text="signin_with"
                     data-size="large"
                     data-logo_alignment="left">
                </div>
            </section>

        </>
    )
}

export default Home