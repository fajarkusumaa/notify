/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index, setSelectedTab, selectedTab }) => {
    console.log(selectedTab);
    console.log(card.id);

    return (
        <Draggable
            key={card.id}
            draggableId={card.id}
            index={index}
            className="relative"
        >
            {(provided) => (
                <>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full"
                    >
                        <div
                            onClick={() => setSelectedTab(card.id)}
                            className="card-content p-4 h-44  rounded-2xl"
                        >
                            <input
                                type="text"
                                placeholder={card.title}
                                className="bg-transparent mb-2 ps-1 text-xl font-bold text-zinc-900 w-full focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                            />
                            <p className="ps-1 opacity-50">{card.desc}</p>
                        </div>
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;
