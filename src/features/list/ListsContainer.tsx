import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

// import { useAppSelector, useAppDispatch } from '../../hooks';
// import { addList } from './listsSlice';

// import { CardProps } from './card/Card';
import List, { ListProps } from './List';

// type ListType = {
// 	id: number;
// 	title: string;
// 	cards: CardProps[];
// };

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
    // const dispatch = useAppDispatch();
    // const lists = useAppSelector((state) => state.lists);
    const [data, setData] = useState<DataType>({ lists: {}, listsIds: [] });
    // const [lists, setLists] = useState([
    //     {
    //         id: generateID(),
    //         title: 'Series',
    //         cards: [
    //             {
    //                 id: generateID(),
    //                 title: 'SNK',
    //                 description: 'SNK description',
    //             },
    //         ],
    //     },
    //     {
    //         id: generateID(),
    //         title: 'Movies',
    //         cards: [
    //             {
    //                 id: generateID(),
    //                 title: 'Suicide Squad',
    //                 description: 'meh',
    //             },
    //             { id: generateID(), title: 'Joker', description: 'good' },
    //         ],
    //     },
    // ]);

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
        const list = data.lists[listId];

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
        const { destination, source } = result;
        if (!destination) return;

        const newData = { ...data };

        // If we move a card within the same list
        if (destination.droppableId === source.droppableId) {
            const list = newData.lists[source.droppableId];
            const [removedCard] = list.cards.splice(source.index, 1);

            // Moves the card to the correct place
            list.cards.splice(destination.index, 0, removedCard);

            setData(newData);
        } else {
            const sourceList = newData.lists[source.droppableId];
            const destinationList = newData.lists[destination.droppableId];
            const [removedCard] = sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, removedCard);

            setData(newData);
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Container>
                {data.listsIds.map((id) => (
                    <List
                        key={id}
                        id={id}
                        list={data.lists[id]}
                        // title={data.lists[id].title}
                        // cards={data.lists[id].cards}
                        addCard={addCard}
                        removeList={removeList}
                        removeCard={removeCard}
                    />
                ))}
                {/* <button onClick={() => dispatch(addList())}> */}
                <button onClick={addList}>Create a new list</button>
            </Container>
        </DragDropContext>
    );
};

const Container = styled.section`
    display: flex;
    gap: 10px;
    button {
        height: min-content;
    }
`;

export default ListsContainer;
