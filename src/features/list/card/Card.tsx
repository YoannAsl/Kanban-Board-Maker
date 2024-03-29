import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
    id: string;
    title: string;
    description: string;
    removeCard: (cardId: string, listId: string) => void;
    index: number;
    listId: string;
}

const Card = ({
    id,
    title,
    description,
    removeCard,
    index,
    listId,
}: CardProps) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <button onClick={() => removeCard(id, listId)}>
                        Delete card
                    </button>
                </Container>
            )}
        </Draggable>
    );
};

const Container = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 10px 0;
    border: 1px solid grey;
    background-color: white;
`;

export default Card;
