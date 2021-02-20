import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import catalogReducer from '../features/catalogSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;