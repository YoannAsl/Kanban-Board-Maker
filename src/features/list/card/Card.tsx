import React from 'react';
import styled from 'styled-components';

export interface CardProps {
	id: number;
	title: string;
	description: string;
	removeCard: (cardId: number) => void;
}

const Card = ({ id, title, description, removeCard }: CardProps) => {
	return (
		<Container>
			<h3>{title}</h3>
			<p>{description}</p>
			<button onClick={() => removeCard(id)}>Delete card</button>
		</Container>
	);
};

const Container = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin: 10px 0;
	border: 1px solid grey;
`;

export default Card;
