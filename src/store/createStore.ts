import { combineReducers, configureStore } from '@reduxjs/toolkit';
import settingsSlice from './slices/settings';
import searchSlice from './slices/search';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	settings: settingsSlice,
	search: searchSlice,
});

const persistConfig = {
	key: 'root',
	whitelist: ['search'],
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor: Persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
