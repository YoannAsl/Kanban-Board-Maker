import React from 'react';
import { useAppSelector } from '../../hooks';

import List from './List';

const ListsContainer = () => {
	const lists = useAppSelector((state) => state.lists);
	return (
		<section>
			{lists.map((list, idx) => (
				<List key={idx} title={list.title} cards={list.cards} />
			))}
		</section>
	);
};

export default ListsContainer;
