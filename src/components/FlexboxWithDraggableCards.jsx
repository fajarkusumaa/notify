/* eslint-disable react/prop-types */
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const FlexboxWithDraggableCards = ({
    cards,
    setCards,
    handleContentChange,
    setSelectedTab
}) => {
    const [draggedIndex, setDraggedIndex] = useState();

    const onDragStart = (result) => {
        setDraggedIndex(result.source.index);
    };

    const onDragEnd = (result) => {
        setDraggedIndex(null);
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const updatedCards = Array.from(cards);
        const [draggedCard] = updatedCards.splice(sourceIndex, 1);
        updatedCards.splice(destinationIndex, 0, draggedCard);

        setCards(updatedCards);
    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="flexbox" direction="vertical">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col gap-4"
                    >
                        {cards.map((card, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTab(index)}
                                className="bg-transparent p-0 m-0 text-start border-none ring-0 outline-none"
                            >
                                <Card
                                    key={card.id}
                                    card={card}
                                    index={index}
                                    isPlaceholder={draggedIndex === index}
                                    handleContentChange={handleContentChange}
                                />
                            </button>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default FlexboxWithDraggableCards;
