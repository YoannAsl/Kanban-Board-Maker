import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

import List from './List';

interface DataType {
    lists: { [key: string]: { title: string; cards: CardType[] } };
    listsIds: string[];
}

export interface CardType {
    title: string;
    description: string;
    id: string;
}

const ListsContainer = () => {
    const [data, setData] = useState<DataType>({ lists: {}, listsIds: [] });

    const addList = () => {
        const listId = uuid();
        const newList = {
            id: listId,
            title: 'Placeholder',
            cards: [],
        };
        setData({
            lists: { ...data.lists, [listId]: newList },
            listsIds: [...data.listsIds, listId],
        });
    };

    const addCard = (listId: string) => {
        const cardId = uuid();
        const list = { ...data.lists[listId] };

        const newCard = {
            id: cardId,
            title: cardId,
            description: 'new card description placholder',
        };
        list.cards.push(newCard);

        setData({
            lists: { ...data.lists, [listId]: list },
            listsIds: [...data.listsIds],
        });
    };

    const removeList = (listId: string) => {
        const newData = { ...data };
        const listIndex = newData.listsIds.indexOf(listId);

        delete newData.lists[listId];
        newData.listsIds.splice(listIndex, 1);
        setData(newData);
    };

    const removeCard = (cardId: string, listId: string) => {
        const newData = { ...data };
        const list = newData.lists[listId];
        const card = list.cards.find((card) => card.id === cardId);
        const cardIndex = list.cards.indexOf(card!);

        list.cards.splice(cardIndex, 1);
        setData(newData);
    };

    const editListTitle = (listId: string, newTitle: string) => {};

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type, draggableId } = result;

        // If we drop a draggable in a non droppable area
        if (!destination) return;

        const newData = { ...data };

        // If we move a list
        if (type === 'list') {
            newData.listsIds.splice(source.index, 1);
            newData.listsIds.splice(destination.index, 0, draggableId);

            setData(newData);
            return;
        }

        // If we move a card within the same list
        if (destination.droppableId === source.droppableId) {
            const list = newData.lists[source.droppableId];
            const [removedCard] = list.cards.splice(source.index, 1);

            list.cards.splice(destination.index, 0, removedCard);

            setData(newData);
            return;
        }

        // If we move a card between different lists
        const sourceList = newData.lists[source.droppableId];
        const destinationList = newData.lists[destination.droppableId];
        const [removedCard] = sourceList.cards.splice(source.index, 1);
        destinationList.cards.splice(destination.index, 0, removedCard);

        setData(newData);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable
                droppableId='all-lists'
                direction='horizontal'
                type='list'
            >
                {(provided) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {data.listsIds.map((id, index) => (
                            <List
                                key={id}
                                id={id}
                                data={data.lists[id]}
                                addCard={addCard}
                                removeList={removeList}
                                removeCard={removeCard}
                                index={index}
                            />
                        ))}
                        <button onClick={addList}>Create a new list</button>
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const Container = styled.section`
    display: inline-flex;
    button {
        height: min-content;
    }
`;

export default ListsContainer;
