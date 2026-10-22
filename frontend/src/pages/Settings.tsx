import ButtonLeft from "../components/ButtonLeft.tsx";

function Settings() {
    return (
        <div className="mx-5 my-10">
            <div className="flex items-center gap-3 mb-10">
                <ButtonLeft />
                <h1 className="text-grafit text-xl font-medium">Nastavení</h1>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-[#16191D]">Účet</h2>
            </div>

            <div className="mx-5 flex items-center justify-between min-h-13 border-b border-[#DCDCD5]">
                <div className="flex-1 py-2">
                    <span className="font-semibold text-lg text-[#16191D]">Zobrazované jméno</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg text-gray-600">Placeholder</span>
                </div>
            </div>
        </div>
    );
}

export default Settings;