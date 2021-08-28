import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';

import Card, { CardProps } from './card/Card';

export interface ListProps {
	id: number;
	title: string;
	cards: { id: number; title: string; description: string }[];
	addCard: (listId: number) => void;
	removeList: (listId: number) => void;
	removeCard: (cardId: number) => void;
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
			<ul>
				{cards.map((card) => (
					<Card
						key={card.id}
						id={card.id}
						title={card.title}
						description={card.description}
						removeCard={removeCard}
					/>
				))}
			</ul>
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
