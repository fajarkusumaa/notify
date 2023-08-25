import { useState, useEffect, useRef } from "react";

import FlexboxWithDraggableCards from "./components/FlexboxWithDraggableCards";
import Sidebar from "./components/Sidebar";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";

import NoteData from "./components/NoteData";

import "./App.css";

function App() {
    const [cards, setCards] = useState([
        {
            id: "1",
            title: "Card title",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero excepturi voluptatibus unde hic! Fuga, dignissimos."
        },
        {
            id: "2",
            title: "Card title",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero excepturi voluptatibus unde hic! Fuga, dignissimos."
        }
    ]);

    const addNewCard = () => {
        const newCard = {
            id: `${cards.length + 1}`,
            title: "Card title",
            desc: "Write your description here..."
        };

        // add New Card
        setCards([...cards, newCard]);

        // add newNote
        const newNote = [
            {
                type: "header",
                data: {
                    text: "Write your journey title here",
                    level: 2
                }
            },

            {
                type: "paragraph",
                data: {
                    text: "Embark on an unforgettable journey where you'll discover [Destination], a [Adjective] land of [Noun] and [Noun]. From the moment you set foot in this [Adjective] paradise, you'll be captivated by the [Adjective] [Landmarks/Scenery] and immersed in the rich tapestry of [Culture/History]."
                }
            },

            {
                type: "list",
                data: {
                    items: [
                        "Chasing fox in forest",
                        "Hunting some ducks and make a grill to cook 'em"
                    ],
                    style: "unordered"
                }
            }
        ];
        NoteData.push(newNote); // Update NoteData array
    };

    const [selectedTab, setSelectedTab] = useState(1);

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
                blocks: NoteData[selectedTab]
            }
        });
    }, [selectedTab]);

    const [show, setShow] = useState(false);

    console.log(selectedTab);

    return (
        <>
            <div className="bg-white w-screen flex ">
                <Sidebar addNewCard={addNewCard} />

                <div className="p-8 text-slate-800 w-full">
                    <div className="flex justify-between container">
                        <input
                            type="text"
                            placeholder="Search notes"
                            className="w-1/3 h-14 rounded-full bg-white border ps-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-transparent"
                        />

                        <div className="profile flex relative">
                            <button
                                onClick={() => setShow(!show)}
                                className="bg-transparent p-0 border-none focus-visible:outline-none focus:outline-none focus-within:border-none"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                                    alt=""
                                    className="border-4 border-slate-100 w-12 h-12 object-cover rounded-full"
                                />
                            </button>

                            <div
                                className={`${
                                    show ? "visible" : "invisible"
                                } absolute ease-in top-20 -right-2 z-20 shadow-xl bg-white rounded-lg p-6 w-[200px]`}
                            >
                                <a href="">My Profile</a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-6">
                        <div className="w-1/3 pt-6">
                            <div className="text-4xl font-bold mb-12 ps-4">
                                Notes
                            </div>
                            <FlexboxWithDraggableCards
                                cards={cards}
                                setCards={setCards}
                                setSelectedTab={setSelectedTab}
                            />
                        </div>

                        <div
                            className="detail-notes prose w-2/3 h-screen px-12 flex align-top  overflow-x-auto track-slate"
                            style={{ maxWidth: "unset" }}
                        >
                            <div id="editorjs" className="w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
