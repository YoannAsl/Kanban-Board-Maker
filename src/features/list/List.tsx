import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { CardType } from './ListsContainer';
import { useAppDispatch } from '../../hooks';

import Card, { CardProps } from './card/Card';

export interface ListProps {
    id: string;
    list: { title: string; cards: CardType[] };
    // title: string;
    // cards: CardType[];
    addCard: (listId: string) => void;
    removeList: (listId: string) => void;
    removeCard: (cardId: string, listId: string) => void;
}

const List = ({
    id,
    list,
    // title,
    // cards,
    addCard,
    removeList,
    removeCard,
}: ListProps) => {
    // const dispatch = useAppDispatch();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(list.title);

    function editTitle(e: React.FormEvent<HTMLTextAreaElement>) {
        setTitle(e.currentTarget.value);
    }

    return (
        <Container>
            {/* {!isEditingTitle ? (
                <h1 onClick={() => setIsEditingTitle(true)}>{title}</h1>
            ) : (
                <input type='text' value={title} onChange={editTitle}></input>
            )} */}

            <Title value={title} onChange={editTitle}></Title>

            <Droppable droppableId={id}>
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {list.cards.map((card, idx) => (
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
    width: 250px;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    margin-left: 5rem;
    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.textarea`
    border: none;
    outline: none;
    resize: none;
    cursor: default;
    padding: 0;
    height: 28px;
    &:focus {
        cursor: text;
    }
`;

export default List;
