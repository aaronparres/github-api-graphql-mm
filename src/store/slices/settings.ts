import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';
import { IssueState } from 'hooks/apihooks';

interface settingsState {
	loading: boolean;
	showErrorModal: boolean;
	listIssuesType: IssueState;
}

const initialState: settingsState = {
	loading: false,
	showErrorModal: false,
	listIssuesType: IssueState.Open,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: initialState,
	reducers: {
		changeLoadingValue: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		showErrorModal: (state, action: PayloadAction<boolean>) => {
			state.showErrorModal = action.payload;
		},
		toggleListIssuesType: (state, action: PayloadAction<IssueState>) => {
			state.listIssuesType = action.payload;
		},
	},
});

// SELECTORS
export const isLoading = (state: RootState) => state.settings.loading;

export const isErrorModalShown = (state: RootState) =>
	state.settings.showErrorModal;

export const selectListIssueType = (state: RootState) =>
	state.settings.listIssuesType;

// ACTIONS
export const { changeLoadingValue, showErrorModal, toggleListIssuesType } =
	settingsSlice.actions;

export default settingsSlice.reducer;
