import React from "react";

type params = {
    avatar: string;
    setDisplay?: React.Dispatch<React.SetStateAction<string>>;
}

function Pfp({ avatar, setDisplay }: params) {

    return (
        <button
            type="button"
            onClick={() => setDisplay?.("block")}
            aria-label="Menu profilu"
            className="w-12 h-12 shrink-0 rounded-full overflow-hidden bg-gray-900 text-white font-bold"
        >
            {avatar &&  (
                <img
                    src={avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                />
            )}
        </button>
    );
}

export default Pfp