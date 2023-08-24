import { useState, useEffect } from "react";

import FlexboxWithDraggableCards from "./components/FlexboxWithDraggableCards";
import Sidebar from "./components/Sidebar";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";

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
        setCards([...cards, newCard]);
    };

    const [selectedTab, setSelectedTab] = useState(0);

    const editorConfigs = [
        {
            holderId: "editorjs0",
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
                    // inlineToolbar: ["link"]
                }
            },
            time: 1550476186479,
            data: {
                blocks: [
                    {
                        type: "header",
                        data: {
                            text: "2-day itinerary for experiencing Japanese culture in Tokyo",
                            level: 2
                        }
                    },
                    {
                        type: "image",
                        data: {
                            url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                            caption: "Mt. Fuji, Japan",
                            stretched: false,
                            withBorder: false
                        }
                    },

                    {
                        type: "paragraph",
                        data: {
                            text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                        }
                    },

                    {
                        type: "list",
                        data: {
                            items: [
                                "It is a block-style editor",
                                "It returns clean data output in JSON",
                                "Designed to be extendable and pluggable with a simple API"
                            ],
                            style: "unordered"
                        }
                    },

                    {
                        type: "paragraph",
                        data: {
                            text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                        }
                    }
                ]
            }
        },
        {
            holderId: "editorjs1",
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
                    // inlineToolbar: ["link"]
                }
            },
            time: 1550476186479,
            data: {
                blocks: [
                    {
                        type: "header",
                        data: {
                            text: "2-day itinerary for experiencing Japanese culture in Spanish",
                            level: 2
                        }
                    },
                    {
                        type: "image",
                        data: {
                            url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                            caption: "Mt. Fuji, Japan",
                            stretched: false,
                            withBorder: false
                        }
                    },

                    {
                        type: "paragraph",
                        data: {
                            text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                        }
                    },

                    {
                        type: "list",
                        data: {
                            items: [
                                "It is a block-style editor",
                                "It returns clean data output in JSON",
                                "Designed to be extendable and pluggable with a simple API"
                            ],
                            style: "unordered"
                        }
                    },

                    {
                        type: "paragraph",

                        data: {
                            text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                        }
                    }
                ]
            }
        }
    ];
    // Editor JS
    useEffect(() => {
        editorConfigs.forEach((config) => {
            const editor = new EditorJS(config);
            // ... do something with the editor instance if needed
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
                            {selectedTab === 0 ? (
                                <div id={`editorjs0`} className="w-full"></div>
                            ) : (
                                <div
                                    id={`editorjs${selectedTab}`}
                                    className="w-full"
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
