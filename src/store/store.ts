import { configureStore } from '@reduxjs/toolkit';
import unautenticatedUserSlice from './slices/unauthenticatedUserSlice';
import { bookkeeperApi } from './slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		unauthenticatedUser: unautenticatedUserSlice,
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
