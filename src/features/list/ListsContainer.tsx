import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addList } from './listsSlice';

// import { CardProps } from './card/Card';
import List, { ListProps } from './List';

// type ListType = {
// 	id: number;
// 	title: string;
// 	cards: CardProps[];
// };

const ListsContainer = () => {
	// const dispatch = useAppDispatch();
	// const lists = useAppSelector((state) => state.lists);
	const [lists, setLists] = useState([
		{
			id: 0,
			title: 'Series',
			cards: [{ id: 0, title: 'SNK', description: 'SNK description' }],
		},
		{
			id: 1,
			title: 'Movies',
			cards: [
				{ id: 0, title: 'Suicide Squad', description: 'meh' },
				{ id: 1, title: 'Joker', description: 'good' },
			],
		},
	]);

	const addList = () => {
		console.log('NEED TO CHANGE IDS');

		const newList = {
			id: lists.length + 1,
			title: 'Placeholder',
			cards: [],
		};
		setLists([...lists, newList]);
	};

	const addCard = (listId: number) => {
		const list = lists.find((list) => list.id === listId);
		const listIndex = lists.indexOf(list!);

		console.log('NEED TO CHANGE IDS');
		const newCard = {
			id: list!.cards.length + 1,
			title: 'New card title placeholder',
			description: 'new card description placholder',
		};

		list!.cards.push(newCard);

		setLists([
			...lists.slice(0, listIndex),
			list!,
			...lists.slice(listIndex + 1),
		]);
	};

	return (
		<section>
			{lists.map((list, idx) => (
				<List
					key={idx}
					id={list.id}
					title={list.title}
					cards={list.cards}
					addCard={addCard}
				/>
			))}
			{/* <button onClick={() => dispatch(addList())}> */}
			<button onClick={addList}>Create a new list</button>
		</section>
	);
};

export default ListsContainer;
