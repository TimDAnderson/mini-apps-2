import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/counter/boardSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    counter: counterReducer,
  },
});
