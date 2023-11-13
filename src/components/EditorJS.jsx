/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
// eslint-disable-next-line no-unused-vars
import ImageTool from "@editorjs/image";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import "../components/Editor.css";

// eslint-disable-next-line no-undef
const Editor = ({ data, card, getData, currentUser }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.destroy();
        }
        editorRef.current = new EditorJS({
            holderId: "editorjs",
            autofocus: true,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
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
                    class: SimpleImage,
                    inlineToolbar: ["link"]
                },
                quote: Quote,
                embed: {
                    class: Embed,
                    config: {
                        services: {
                            youtube: true,
                            html: true
                        }
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true
                },
                Color: {
                    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                    config: {
                        colorCollections: [
                            "#EC7878",
                            "#9C27B0",
                            "#673AB7",
                            "#3F51B5",
                            "#0070FF",
                            "#03A9F4",
                            "#00BCD4",
                            "#4CAF50",
                            "#8BC34A",
                            "#CDDC39",
                            "#FFF"
                        ],
                        defaultColor: "#FF1300",
                        type: "text",
                        customPicker: true // add a button to allow selecting any colour
                    }
                },
                Marker: {
                    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                    config: {
                        defaultColor: "#FFBF00",
                        type: "marker",
                        icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                    }
                }
            },
            data: {
                blocks: data
            } // Pass the blocks from card.content.blocks
        });
    }, [data]);

    const handleSave = async () => {
        console.log(card);
        const savedData = await editorRef.current.save(); // Retrieve Editor.js content
        const noteRef = doc(db, "users", currentUser, "cards", card.id);
        await updateDoc(noteRef, {
            content: savedData
        });

        getData();
    };

    return (
        <>
            <div className="flex justify-between absolute flex-1 w-full items-center py-4 px-8 backdrop-blur-lg z-10 bg-opacity-80 bg-white">
                <div>
                    {/* Created on : */}
                    <span className="opacity-50"> {card.createOn}</span>
                </div>

                <button
                    onClick={() => handleSave()}
                    className="text-white bg-zinc-800"
                >
                    Save
                </button>
            </div>
            <div className="h-screen overflow-scroll mt-14">
                {" "}
                <div id="editorjs" className="w-100 mt-8"></div>
            </div>
        </>
    );
};

export default Editor;
