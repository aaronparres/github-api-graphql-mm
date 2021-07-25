import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';
import { IssueState } from 'hooks/apihooks';

interface settingsState {
	listIssuesType: IssueState;
}

const initialState: settingsState = {
	listIssuesType: IssueState.Open,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: initialState,
	reducers: {
		toggleListIssuesType: (state, action: PayloadAction<IssueState>) => {
			state.listIssuesType = action.payload;
		},
	},
});

// SELECTORS
export const selectListIssueType = (state: RootState) =>
	state.settings.listIssuesType;

// ACTIONS
export const { toggleListIssuesType } = settingsSlice.actions;

export default settingsSlice.reducer;
