import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';

interface searchState {
	previousSearchTerms: string[];
}

const initialState: searchState = {
	previousSearchTerms: [],
};

export const searchSlice = createSlice({
	name: 'search',
	initialState: initialState,
	reducers: {
		updatePreviousSearchTerms: (state, action: PayloadAction<string>) => {
			const isAlreadySaved = state.previousSearchTerms.some(
				(term) => term === action.payload,
			);
			if (isAlreadySaved) return;
			state.previousSearchTerms.push(action.payload);
		},
	},
});

// SELECTORS

export const selectPreviousSearchElements = (state: RootState) =>
	state.search.previousSearchTerms;

// ACTIONS
export const { updatePreviousSearchTerms } = searchSlice.actions;

export default searchSlice.reducer;
