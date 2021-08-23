import React from 'react';
import Card, { CardProps } from './card/Card';

interface Props {
	title: string;
	cards: CardProps[];
}

const List = ({ title, cards }: Props) => {
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
		</li>
	);
};

export default List;
