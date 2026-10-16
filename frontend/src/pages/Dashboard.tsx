import Cookies from 'js-cookie'


function Dashboard() {
    const user = Cookies.get("user_name")
    console.log("user" + user)
    const date = new Date().toLocaleDateString("cs-CZ");


    return (
        <>
            <div className={"mx-5 my-10"}>
                <div className={"flex flex-row justify-between vertical-align-center"}>
                    <div>
                        <span className={"text-gray-600 font-medium"}>{date}</span>
                        <h1 className={"text-gray-950 mt-0.3 text-3xl! w-fit!"}>Vítej {user}</h1>
                    </div>

                    <div className={"w-15 h-15 rounded-full bg-black bg-center bg-cover bg-[url(https://lh3.googleusercontent.com/a/ACg8ocKXIKD-rvLFAjJYT3q3YxTfa3eh8LgEMApcV4q9vTjv4s87OFU=s96-c)]"}></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;