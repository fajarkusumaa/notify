/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";

import { doc, updateDoc } from "firebase/firestore";
import moment from "moment/moment";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";

import "../components/Card.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";

const Card = ({ data, card, setSelectedTab, onDelete }) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --------------------

    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.destroy();
        }
        editorRef.current = new EditorJS({
            holderId: `editorjs-${card.length + 1}`,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ["link"],
                    config: {
                        placeholder: "Enter a header",
                        levels: [1, 2, 3, 4],
                        defaultLevel: 3
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true
                },
                image: {
                    class: SimpleImage
                }
            },
            data: {
                blocks: [
                    {
                        id: "oUq2g_tl8y",
                        type: "header",
                        data: {
                            text: card.content.blocks[0].data.text,
                            level: 2
                        }
                    },
                    {
                        id: "zbGZFPM-iI",
                        type: "paragraph",
                        data: {
                            text: card.content.blocks[1].data.text
                        }
                    }
                ]
            } // Pass the blocks from card.content.blocks
        });
    }, [data]);

    return (
        <>
            <div
                onClick={() => setSelectedTab(card.id)}
                className="card-content px-5 py-4 h-44 w-full rounded-2xl cursor-pointer relative flex flex-col justify-between text-start focus-visible:outline-none ring-0"
            >
                <div
                    id={`editorjs-${card.length + 1}`}
                    className="w-100 bg-zinc-400"
                ></div>

                <div className="flex items-center">
                    <input
                        required
                        id={`title-${card.id}`}
                        type="text"
                        placeholder={
                            card.title.length > 0 ? card.title : "Card title"
                        }
                        className="bg-transparent ps-1 text-xl font-bold text-zinc-900 w-full focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                    />
                    <div className="action flex items-center">
                        {/* Save Button */}

                        <button
                            onClick={() => onSave()}
                            className="w-auto bg-transparent p-2 h-auto flex justify-center right-4 top-4 border-2"
                        >
                            Save
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 ms-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                                />
                            </svg> */}
                        </button>

                        {/* Delete Button */}
                        <button
                            onClick={() => onDelete()}
                            className="p-2 bg-transparent"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-red-500"
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
                <input
                    id={`desc-${card.id}`}
                    type="text"
                    value={
                        card.desc.length > 0
                            ? card.desc
                            : "Write your description here"
                    }
                    placeholder={
                        card.desc.length > 0
                            ? card.desc
                            : "Write your description here"
                    }
                    required
                    className="bg-transparent my-2 ps-1 text-lg w-full focus:bg-zinc-100 opacity-50 focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                />

                {/* Time Update */}
                <p className="text-zinc-300 text-base">{timeAgo}</p>
            </div>
        </>
    );
};

export default Card;
