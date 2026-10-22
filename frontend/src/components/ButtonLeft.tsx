function ButtonLeft() {
    return (
        <button
            type="button"
            className="w-15 h-15 flex items-center justify-center rounded-md border border-gray-500 active:bg-gray-100 transition-colors"
        >
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(22, 25, 29)"
                strokeWidth="3"
                strokeLinecap="square"
                strokeLinejoin="miter"
            >
                <path d="M15.5 4.5 8 12l7.5 7.5" />
            </svg>
        </button>
    )
}

export default ButtonLeft;