/* eslint-disable react/prop-types */
const Sidebar = ({ addNewCard, cards }) => {
    return (
        <div className="w-96 h-screen bg-white text-slate-800">
            <div className="p-6 w-full">
                <div className="text-zinc-900 hover:bg-slate-100 flex gap-2 p-2 w-full z-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Notes"
                        className="bg-transparent placeholder:text-zinc-900 relative z-10"
                    />
                </div>
            </div>

            {/* Side Nav */}
            <div className="p-6">
                {cards?.length >= 5 ? (
                    <button className="w-full bg-orange-500 text-white transition-transform ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-sm">
                        Upgrade to pro
                    </button>
                ) : (
                    <button
                        className="w-full bg-zinc-50 text-zinc-900 transition-transform ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-sm"
                        onClick={() => addNewCard()}
                    >
                        + New Notes
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
