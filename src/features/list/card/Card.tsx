import React from 'react';

export interface CardProps {
	id: number;
	title: string;
	description: string;
	removeCard: (cardId: number) => void;
}

const Card = ({ id, title, description, removeCard }: CardProps) => {
	return (
		<li>
			<h3>{title}</h3>
			<p>{description}</p>
			<button onClick={() => removeCard(id)}>Delete card</button>
		</li>
	);
};

export default Card;
