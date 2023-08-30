/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";

import moment from "moment/moment";
import { useState, useEffect } from "react";

import "../components/Card.css";

const Card = ({ card, setSelectedTab, onDelete }) => {
    // const onSave = async () => {
    //     const noteRef = doc(db, "cards", card.id);
    //     // Set the "capital" field of the city 'DC'
    //     await updateDoc(noteRef, {
    //         title: document.getElementById(`title-${card.id}`).value,
    //         desc: document.getElementById(`desc-${card.id}`).value
    //     });
    //     console.log(card.id);
    // };

    // GetTime
    const [timeAgo, setTimeAgo] = useState();

    const updatingTime = () => {
        const updateTime = moment(card.content.time).fromNow();
        setTimeAgo(updateTime);
    };

    useEffect(() => {
        updatingTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --------------------

    const filteredBlocks = card?.content.blocks.filter(
        (block) => block.type === "paragraph"
    );
    const paragraphData = filteredBlocks.map((block) => block.data);
    console.log(paragraphData);

    const filteredHeader = card?.content.blocks.filter(
        (block) => block.type === "header"
    );
    const headerData = filteredHeader.map((block) => block.data);

    console.log(headerData);

    return (
        <>
            <div
                onClick={() => setSelectedTab(card.id)}
                className="card-content px-5 py-4 h-fit w-full rounded-2xl cursor-pointer relative flex flex-col justify-between text-start focus-visible:outline-none ring-0"
            >
                <div className="flex items-center">
                    {/* <input
                        required
                        id={`title-${card.id}`}
                        type="text"
                        value=
                        className="bg-transparent ps-1 text-xl font-bold text-zinc-900 w-full focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                    /> */}

                    <p className="bg-transparent text-xl font-bold text-zinc-900 w-full focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900">
                        {headerData[0].text}
                    </p>

                    <div className="action flex items-center">
                        {/* Delete Button */}
                        <button
                            onClick={() => onDelete()}
                            className="p-2 bg-transparent hover:bg-red-400 hover:text-white text-red-500 ease-in "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-[20px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <p className="my-2 line-clamp-3 text-ellipsis overflow-hidden font-medium text-base w-full focus:bg-zinc-100 opacity-50 focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900 pe-4">
                    {paragraphData[0].text}
                </p>

                {/* Time Update */}
                <p className="text-zinc-400 text-sm mt-6 font-medium">
                    <span>Updated {timeAgo}</span>
                </p>
            </div>
        </>
    );
};

export default Card;
