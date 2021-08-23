import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		id: 0,
		title: 'Series',
		cards: [{ id: 0, title: 'SNK', description: 'SNK description' }],
	},
	{
		id: 1,
		title: 'Movies',
		cards: [
			{ id: 0, title: 'Suicide Squad', description: 'meh' },
			{ id: 1, title: 'Joker', description: 'good' },
		],
	},
];

export const listsSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		addList: (state) => {
			const newList = {
				id: state.length + 1,
				title: 'Placeholder',
				cards: [],
			};
			state.push(newList);
		},
	},
});

export const { addList } = listsSlice.actions;
export default listsSlice.reducer;
