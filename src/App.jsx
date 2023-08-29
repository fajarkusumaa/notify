import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";

import "./App.css";

import {
    doc,
    addDoc,
    collection,
    getDocs,
    deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";

import Card from "./components/Card";
import Editor from "./components/EditorJS";

function App() {
    const [cards, setCards] = useState([]);

    // Get Data
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "cards"));
        const tempData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            tempData.push({ ...doc.data(), id: doc.id });
        });
        setCards(tempData);

        console.log(tempData);
    };
    // -- Get Data

    useEffect(() => {
        getData();
    }, []);

    // Add Card
    const addNewCard = async () => {
        try {
            const docRef = await addDoc(collection(db, "cards"), {
                title: "Card Title",
                desc: "Write your description here",
                content: {
                    blocks: [
                        {
                            type: "header",

                            data: {
                                text: "Write your journey title here !",
                                level: 1
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
                    ]
                }
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        getData();
    };

    // Delete Card
    const onDelete = async (card) => {
        await deleteDoc(doc(db, "cards", card));
        getData();
    };

    const [selectedTab, setSelectedTab] = useState(null);

    const [docID, setDocID] = useState();

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="bg-white w-screen h-auto flex ">
                {" "}
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

                            <div className="flex flex-col gap-4">
                                {cards?.map((card, i) => {
                                    console.log(card.content.blocks);
                                    return (
                                        <>
                                            <button
                                                onClick={() => setDocID(i)}
                                                className="bg-transparent p-0 m-0 border-0 outline-none ring-0"
                                                key={i}
                                            >
                                                <Card
                                                    onClick={() =>
                                                        setDocID(card.id)
                                                    }
                                                    selectedTab={selectedTab}
                                                    setSelectedTab={
                                                        setSelectedTab
                                                    }
                                                    card={card}
                                                    onDelete={() =>
                                                        onDelete(card.id)
                                                    }
                                                />
                                            </button>
                                        </>
                                    );
                                })}
                            </div>
                        </div>

                        <div
                            className="detail-notes prose w-2/3 h-auto align-top  overflow-x-auto track-slate"
                            style={{ maxWidth: "100%" }}
                        >
                            {cards.map((card, i) => {
                                console.log(card);
                                return (
                                    <>
                                        {docID === i && (
                                            <Editor
                                                data={card.content.blocks}
                                                docID={docID} // Pass the index (docID) of the card
                                                card={card}
                                            />
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
