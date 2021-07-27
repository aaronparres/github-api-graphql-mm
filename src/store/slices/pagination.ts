import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';
import { IssueState } from 'hooks/apihooks';

interface paginationState {
	page: number;
}

const initialState: paginationState = {
	page: 0,
};

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState: initialState,
	reducers: {},
});

// SELECTORS

// ACTIONS
// export const {} = paginationSlice.actions;

export default paginationSlice.reducer;
