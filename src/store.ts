import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './features/list/listsSlice';

export const store = configureStore({
	reducer: { lists: listsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
