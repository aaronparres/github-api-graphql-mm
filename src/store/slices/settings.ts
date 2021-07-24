import { createSlice } from '@reduxjs/toolkit';

interface settingsState {
  name: string;
}

const initialState: settingsState = {
  name: 'obi wan',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {},
});

// SELECTORS

// ACTIONS
// export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
