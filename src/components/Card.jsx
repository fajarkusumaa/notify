/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
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
                        <div className="card-content p-4 bg-zinc-50 h-44 rounded-lg">
                            <div className="">
                                <input
                                    type="text"
                                    placeholder={card.title}
                                    className="bg-transparent mb-2 ps-1 text-xl font-bold text-zinc-900 focus-visible:outline-none placeholder:opacity-100 placeholder:text-zinc-900"
                                />
                                <p className="ps-1 opacity-50">{card.desc}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;
