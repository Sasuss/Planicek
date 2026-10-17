import React from "react";

type params = {
    avatar: string;
    setDisplay?: React.Dispatch<React.SetStateAction<string>>;
}


function Pfp(params: params) {

    return (
        <>
            <div onClick={() => params.setDisplay?.("block")} className={`w-12 h-12 rounded-full bg-black bg-cover`} style={{ backgroundImage: `url("${params.avatar}")`, backgroundPosition: "center" }}></div>
        </>
    )


}

export default Pfp