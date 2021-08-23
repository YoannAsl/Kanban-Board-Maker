import React from 'react';

export interface CardProps {
	title: string;
	description: string;
}

const Card = ({ title, description }: CardProps) => {
	return (
		<li>
			<h3>{title}</h3>
			<p>{description}</p>
		</li>
	);
};

export default Card;
