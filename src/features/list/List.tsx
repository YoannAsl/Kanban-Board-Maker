import React from 'react';
import { useAppDispatch } from '../../hooks';
import Card, { CardProps } from './card/Card';

export interface ListProps {
	id: number;
	title: string;
	cards: CardProps[];
	addCard: (listId: number) => void;
}

const List = ({ id, title, cards, addCard }: ListProps) => {
	// const List = ({ list }: ListProps) => {
	// const { title, cards } = list;
	// const dispatch = useAppDispatch();

	return (
		<li>
			<h1>{title}</h1>
			<ul>
				{cards.map((card, idx) => (
					<Card
						key={idx}
						title={card.title}
						description={card.description}
					/>
				))}
			</ul>
			<button onClick={() => addCard(id)}>Create a new card</button>
		</li>
	);
};

export default List;
