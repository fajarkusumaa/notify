/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";

const Editor = ({ data, card }) => {
    console.log(card);

    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.destroy();
        }
        editorRef.current = new EditorJS({
            holderId: "editorjs",
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
        updatingTime();
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

    console.log();

    return (
        <>
            <div className="w-full justify-between items-center relative">
                <div id="editorjs" className="w-100"></div>
                <button
                    onClick={() => handleSave()}
                    className="text-white absolute right-0 top-0"
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default Editor;
