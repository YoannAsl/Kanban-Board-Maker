import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { CardType } from './ListsContainer';
import { useAppDispatch } from '../../hooks';

import Card, { CardProps } from './card/Card';

export interface ListProps {
    id: string;
    title: string;
    cards: CardType[];
    addCard: (listId: string) => void;
    removeList: (listId: string) => void;
    removeCard: (cardId: string, listId: string) => void;
}

const List = ({
    id,
    title,
    cards,
    addCard,
    removeList,
    removeCard,
}: ListProps) => {
    // const dispatch = useAppDispatch();

    return (
        <Container>
            <h1>{title}</h1>
            <Droppable droppableId={id}>
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.map((card, idx) => (
                            <Card
                                key={card.id}
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                removeCard={removeCard}
                                index={idx}
                                listId={id}
                            />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

            <button onClick={() => addCard(id)}>Create a new card</button>
            <button onClick={() => removeList(id)}>Remove list</button>
        </Container>
    );
};

const Container = styled.li`
    display: flex;
    width: 10%;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
`;

export default List;
