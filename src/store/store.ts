import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import authReducer from './slices/authSlice';
import { bookkeeperApi } from './slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		global: globalReducer,
		auth: authReducer,
		[bookkeeperApi.reducerPath]: bookkeeperApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(bookkeeperApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
