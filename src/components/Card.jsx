/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";

import { doc, updateDoc } from "firebase/firestore";
import moment from "moment/moment";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const Card = ({ card, setSelectedTab, onDelete }) => {
    const onSave = async () => {
        const noteRef = doc(db, "cards", card.id);
        // Set the "capital" field of the city 'DC'
        await updateDoc(noteRef, {
            title: document.getElementById(`title-${card.id}`).value,
            desc: document.getElementById(`desc-${card.id}`).value
        });
        console.log(card.id);
    };

    // GetTime
    const [timeAgo, setTimeAgo] = useState();

    const updatingTime = () => {
        const updateTime = moment(card.content.time).fromNow();
        setTimeAgo(updateTime);
    };

    useEffect(() => {
        updatingTime();
    }, []);

    return (
        <div
            onClick={() => setSelectedTab(card.id)}
            className="card-content px-5 py-4 h-44 bg-zinc-50 rounded-2xl cursor-pointer relative flex flex-col justify-between text-start"
        >
            <div>
                <div className="flex w-full items-center">
                    <input
                        required
                        id={`title-${card.id}`}
                        type="text"
                        placeholder={card.title}
                        className="bg-transparent mb-2 ps-1 text-xl font-bold text-zinc-900 w-full focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                    />
                    <button
                        onClick={() => onSave()}
                        className="w-auto bg-transparent p-2 h-auto flex justify-center absolute right-4 top-4"
                    >
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
                                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                            />
                        </svg>
                    </button>
                </div>
                <input
                    id={`desc-${card.id}`}
                    type="text"
                    placeholder={
                        card.desc.length > 0
                            ? card.desc
                            : "Write your description here"
                    }
                    className="bg-transparent my-2 ps-1 text-lg w-full focus:bg-zinc-100 opacity-50 focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                />

                <button onClick={() => onDelete()}>Del</button>
            </div>

            {/* Time Update */}
            <p className="text-zinc-300 text-base">{timeAgo}</p>
        </div>
    );
};

export default Card;
