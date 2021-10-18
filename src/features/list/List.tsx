import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
    index: number;
}

const List = ({
    id,
    list,
    // title,
    // cards,
    addCard,
    removeList,
    removeCard,
    index,
}: ListProps) => {
    // const dispatch = useAppDispatch();
    const [title, setTitle] = useState(list.title);

    function editTitle(e: React.FormEvent<HTMLTextAreaElement>) {
        setTitle(e.currentTarget.value);
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Title
                        value={title}
                        onChange={editTitle}
                        // {...provided.dragHandleProps}
                    />

                    <Droppable
                        droppableId={id}
                        direction='vertical'
                        type='card'
                    >
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
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

                    <button onClick={() => addCard(id)}>
                        Create a new card
                    </button>
                    <button onClick={() => removeList(id)}>Remove list</button>
                </Container>
            )}
        </Draggable>
    );
};

const Container = styled.li`
    display: inline-flex;
    width: 250px;
    flex-direction: column;
    border: 1px solid black;
    margin-left: 5rem;
    padding: 10px;
    background-color: white;
    ul {
        display: flex;
        flex-direction: column;
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
