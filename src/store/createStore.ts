import { combineReducers, configureStore } from '@reduxjs/toolkit';
import paginationSlice from './slices/pagination';
import settingsSlice from './slices/settings';

const rootReducer = combineReducers({
	settings: settingsSlice,
	pagination: paginationSlice,
});

export const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
