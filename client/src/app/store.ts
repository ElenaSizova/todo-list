import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../entities/task/taskSlice';
import addTaskReducer from '../features/addTask/AddTaskSlice';
import todoListReducer from '../features/todoList/TodoListSlice';

export const store = configureStore({
  reducer: {
    entities: combineReducers({
      task: taskReducer,
    }),
    ui: combineReducers({
      addTask: addTaskReducer,
      todoList: todoListReducer,
    })
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
