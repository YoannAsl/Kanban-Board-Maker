import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addList } from './listsSlice';

import List from './List';

const ListsContainer = () => {
	const dispatch = useAppDispatch();
	const lists = useAppSelector((state) => state.lists);

	return (
		<section>
			{lists.map((list, idx) => (
				<List key={idx} title={list.title} cards={list.cards} />
			))}
			<button onClick={() => dispatch(addList())}>
				Create a new list
			</button>
		</section>
	);
};

export default ListsContainer;
