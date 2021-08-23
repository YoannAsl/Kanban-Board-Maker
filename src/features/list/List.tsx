import React from 'react';
import { useAppDispatch } from '../../hooks';
import Card, { CardProps } from './card/Card';

interface ListProps {
	title: string;
	cards: CardProps[];
}

const List = ({ title, cards }: ListProps) => {
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
			{/* <button onClick={() => dispatch()}>Create a new list</button> */}
		</li>
	);
};

export default List;
