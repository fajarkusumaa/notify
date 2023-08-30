/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import "../components/Editor.css";

const Editor = ({ data, card, getData }) => {
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
        const noteRef = doc(db, "cards", card.id);
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

                <button onClick={() => handleSave()} className="text-white">
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
