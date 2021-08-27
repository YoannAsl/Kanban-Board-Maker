import React from 'react';
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
	// const List = ({ list }: ListProps) => {
	// const { title, cards } = list;
	// const dispatch = useAppDispatch();

	return (
		<li>
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
		</li>
	);
};

export default List;
