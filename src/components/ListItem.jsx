/* eslint-disable react/prop-types */
import styled from "styled-components";

const Author = styled.div`
    display: flex;
    align-items: center;
`;

const CardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DragItem = styled.div`
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    background: white;
    margin: 0 0 8px 0;
    display: grid;
    grid-gap: 20px;
    flex-direction: column;
`;

const ListItem = ({ item, provided }) => {
    return (
        <DragItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <span>{item.id}</span>
            <CardFooter>
                <span>{item.content}</span>
                <Author>{item.id}</Author>
            </CardFooter>
        </DragItem>
    );
};

export default ListItem;
