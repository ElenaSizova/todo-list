import { createSelector } from '@reduxjs/toolkit';
import {RootState} from '../../app/store'
import {taskAdapter} from './taskSlice'

export const {
    selectAll: selectTaskAll,
    selectById: selectTaskById,
    selectIds: selectTaskIds,
} = taskAdapter.getSelectors<RootState>(state => state.entities.task);

export const getCountTasksLeft = createSelector(
    selectTaskAll,
    tasks => tasks
        .filter(task => !task.isCompleted)
        .length
);