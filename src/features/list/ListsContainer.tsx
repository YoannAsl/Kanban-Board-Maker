import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { addList } from './listsSlice';

// import { CardProps } from './card/Card';
import List, { ListProps } from './List';

// type ListType = {
// 	id: number;
// 	title: string;
// 	cards: CardProps[];
// };

const generateID = () => Math.floor(Math.random() * 10000);

const ListsContainer = () => {
	// const dispatch = useAppDispatch();
	// const lists = useAppSelector((state) => state.lists);
	const [lists, setLists] = useState([
		{
			id: generateID(),
			title: 'Series',
			cards: [
				{
					id: generateID(),
					title: 'SNK',
					description: 'SNK description',
				},
			],
		},
		{
			id: generateID(),
			title: 'Movies',
			cards: [
				{
					id: generateID(),
					title: 'Suicide Squad',
					description: 'meh',
				},
				{ id: generateID(), title: 'Joker', description: 'good' },
			],
		},
	]);

	const addList = () => {
		const newList = {
			id: generateID(),
			title: 'Placeholder',
			cards: [],
		};
		setLists([...lists, newList]);
	};

	const addCard = (listId: number) => {
		// Gets list and index from the state
		const list = lists.find((list) => list.id === listId);
		const listIndex = lists.indexOf(list!);

		const newCard = {
			id: generateID(),
			title: 'New card title placeholder',
			description: 'new card description placholder',
		};

		// Adds the new card to the list
		list!.cards.push(newCard);

		// Replaces the old list with the updated list
		setLists([
			...lists.slice(0, listIndex),
			list!,
			...lists.slice(listIndex + 1),
		]);
	};

	const removeList = (listId: number) => {
		// Gets list and index from the state
		const list = lists.find((list) => list.id === listId);
		const listIndex = lists.indexOf(list!);

		// Creates a copy of the state then removes the list
		const newLists = [...lists];
		newLists.splice(listIndex, 1);

		setLists(newLists);
	};

	const removeCard = (cardId: number) => {
		// Gets list and index from the state
		const list = lists.find((list) =>
			list.cards.some((card) => card.id === cardId)
		);
		const listIndex = lists.indexOf(list!);

		// Gets card and index
		const card = list!.cards.find((card) => card.id === cardId);
		const cardIndex = list!.cards.indexOf(card!);

		list!.cards.splice(cardIndex, 1);

		setLists([
			...lists.slice(0, listIndex),
			list!,
			...lists.slice(listIndex + 1),
		]);
	};

	const handleOnDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;
		// console.log(result);
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// Created a copy of the list and the list's cards
		const list = lists[+source.droppableId];
		const copiedCards = [...list.cards];

		// Removes the selected card from the list
		const [removed] = copiedCards.splice(source.index, 1);

		// Moves the card to the correct place
		copiedCards.splice(destination.index, 0, removed);

		const reorderedList = { ...list, cards: copiedCards };

		setLists([
			...lists.slice(0, +source.droppableId),
			reorderedList,
			...lists.slice(+source.droppableId + 1),
		]);
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Container>
				{lists.map((list, idx) => (
					<List
						key={list.id}
						id={list.id}
						title={list.title}
						cards={list.cards}
						addCard={addCard}
						removeList={removeList}
						removeCard={removeCard}
						idx={idx}
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
