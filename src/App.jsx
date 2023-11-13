import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";

import "./App.css";

import {
    doc,
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    query
} from "firebase/firestore";
import { db } from "../firebase";

import Card from "./components/Card";
import Editor from "./components/EditorJS";
import moment from "moment/moment";
import HandleGoogle from "./components/HandleGoogle";
import HandleSignOut from "./components/HandleSignOut";

function App() {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState(cards);

    const [currentUser, setCurrentUser] = useState("");

    console.log(currentUser);

    useEffect(() => {
        setUser({
            name: user.displayName,
            photoURL: localStorage.getItem("photoURL"),
            email: localStorage.getItem("email")
        });
    }, []);

    const [user, setUser] = useState({});
    console.log(user);

    const now = new Date();
    console.log(now);

    const [selectedTab, setSelectedTab] = useState(null);
    const [docID, setDocID] = useState();

    const [show, setShow] = useState(false);

    // Get Data
    const getData = async () => {
        const q = query(collection(db, "users", currentUser, "cards"));

        const querySnapshot = await getDocs(q);

        const tempData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            tempData.push({ ...doc.data(), id: doc.id });
        });
        setCards(tempData);
        setFilteredCards(tempData);
    };

    useEffect(() => {
        getData();
    }, [currentUser]);
    // -- Get Data

    // Add Card
    const addNewCard = async () => {
        console.log(currentUser.uid);
        const createDate = moment().format("dddd , MMMM Do YYYY, h:mm a");

        try {
            await addDoc(collection(db, "users", currentUser, "cards"), {
                title: "Card Title",
                desc: "Write your description here",
                content: {
                    blocks: [
                        {
                            type: "header",

                            data: {
                                text: "Journey to the Mountains !",
                                level: 1
                            }
                        },

                        {
                            type: "image",
                            data: {
                                url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
                            }
                        },

                        {
                            type: "paragraph",
                            data: {
                                text: "Embark on a breathtaking adventure through rugged terrains and towering peaks. Immerse yourself in the beauty of nature as you hike through lush forests, cross babbling streams, and conquer challenging trails. Whether you're an experienced mountaineer or a novice explorer, this journey promises awe-inspiring vistas and unforgettable moments. Get ready to discover the serenity of the mountains and create memories that will last a lifetime."
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
                },
                createOn: createDate
            });

            console.log("Add document success !");
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        getData();
    };

    // Delete Card
    const onDelete = async (card) => {
        try {
            await deleteDoc(doc(db, "users", currentUser, "cards", card));
            console.log("delete success !");
        } catch (e) {
            console.error("Error delete cards: ", e);
        }
        getData();
    };

    // Search Term
    const [searchTerm, setSearchTerm] = useState("");

    // Search function
    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchTerm(searchText);

        const filtered = cards.filter(
            (card) =>
                card.title.toLowerCase().includes(searchText) ||
                card.content.blocks.some(
                    (block) =>
                        block.type === "header" &&
                        block.data.text.toLowerCase().includes(searchText)
                )
        );

        setFilteredCards(filtered);
    };

    if (!cards) {
        return <></>;
    }
    return (
        <>
            <div className="bg-white h-screen flex-col overflow-clip">
                {/* Navbar */}
                <div className="w-full min-w-screen bg-white flex px-8 py-6 items-center justify-between">
                    {/* Brand Logo */}
                    <div className="font-bold text-slate-800 text-2xl">
                        Noti<span className="text-orange-400 italic">fy</span>
                    </div>
                    {/* = Brand Logo */}
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-1/3 h-14 rounded-full text-zinc-600 font-bold bg-white border ps-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-transparent"
                    />

                    <div className="profile flex relative">
                        {/* New Notes */}
                        <div className="p-6 sm:block lg:hidden">
                            {cards?.length >= 5 ? (
                                <button className="w-full bg-orange-500 text-white transition-transform ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-sm">
                                    Upgrade to pro
                                </button>
                            ) : (
                                <button
                                    className="w-full bg-zinc-50 text-zinc-900 font-bold transition-transform ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-sm"
                                    onClick={() => addNewCard()}
                                >
                                    + New Notes
                                </button>
                            )}
                        </div>

                        {!currentUser ? (
                            <>
                                {" "}
                                <HandleGoogle
                                    setUser={setUser}
                                    setCurrentUser={setCurrentUser}
                                    user={user}
                                />
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShow(!show)}
                                    className="bg-transparent p-0 border-none focus-visible:outline-none focus:outline-none focus-within:border-none"
                                >
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="border-4 border-slate-100 w-12 h-12 object-cover rounded-full"
                                    />
                                </button>
                                <div
                                    className={`${
                                        show ? "visible" : "invisible"
                                    } absolute ease-in top-20 -right-2 z-50 bg-white text-gray-600 rounded-lg flex flex-col p-4 w-[200px] border`}
                                >
                                    <p className="mb-3 capitalize">
                                        {user.name}
                                    </p>

                                    <HandleSignOut setUser={setUser} />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex w-screen">
                    <div className="hidden lg:block">
                        {" "}
                        <Sidebar addNewCard={addNewCard} cards={cards} />
                    </div>
                    <div className="p-8 pt-0 text-slate-800 w-full">
                        {/* Main Content */}
                        <div className="mt-8 flex lg:flex-row sm:flex-col xs:flex-col h-screen pb-40">
                            <div className="hidden w-full md:block md:w-1/3 sm:w-1/3 h-auto  overflow-y-auto overflow-x-hidden">
                                <div className="text-4xl fixed z-10 bg-white w-full font-bold mb-12 py-4">
                                    Notes
                                </div>

                                <div className="gap-4 flex flex-col mt-24 pe-4">
                                    {filteredCards?.map((card, i) => {
                                        return (
                                            <>
                                                <label
                                                    key={i}
                                                    className="bg-zinc-50 rounded-xl p-0 m-0  border-0 focus-visible:outline-none focus:outline-none ring-0 flex items-center hover:bg-zinc-100"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="selectedCard"
                                                        onChange={() =>
                                                            setDocID(i)
                                                        }
                                                        className="peer hidden"
                                                    />
                                                    <Card
                                                        onClick={() =>
                                                            setDocID(card.id)
                                                        }
                                                        selectedTab={
                                                            selectedTab
                                                        }
                                                        setSelectedTab={
                                                            setSelectedTab
                                                        }
                                                        data={
                                                            card.content.blocks
                                                        }
                                                        card={card}
                                                        onDelete={() =>
                                                            onDelete(card.id)
                                                        }
                                                    />
                                                </label>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                className="detail-notes prose w-full h-auto align-top relative track-slate"
                                style={{ maxWidth: "100%" }}
                            >
                                {cards?.map((card, i) => {
                                    console.log(card);
                                    return (
                                        <>
                                            {docID === i && (
                                                <Editor
                                                    data={card.content.blocks}
                                                    docID={docID} // Pass the index (docID) of the card
                                                    card={card}
                                                    getData={getData}
                                                    currentUser={currentUser}
                                                />
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
