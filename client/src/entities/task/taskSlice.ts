import {createSlice, createEntityAdapter, PayloadAction} from '@reduxjs/toolkit'
import { 
    NormalizedTasksPayload,
    getTasksByListId,
    updateTask,
    createTask,
    completeAllTasksListId
} from '../../effects/todoListEffect'
import {TaskId, Task} from './task';

export const taskAdapter = createEntityAdapter<Task>(({
    selectId: (task: Task): TaskId => task.id,
}))

export const taskSlice = createSlice({
    name: 'task',
    initialState: taskAdapter.getInitialState(),
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasksByListId.fulfilled, (state, action: PayloadAction<NormalizedTasksPayload>) => {
                taskAdapter.upsertMany(state, action.payload.entities.tasks)
            })
        builder
            .addCase(updateTask.fulfilled, (state, action) => {
                const {taskId, isCompleted} = action.meta.arg;
                taskAdapter.updateOne(state, {id: taskId, changes: {isCompleted }})
            })  
        builder
            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
                taskAdapter.upsertOne(state, action.payload)
            })
        builder
            .addCase(completeAllTasksListId.fulfilled, (state, action) => {
                taskAdapter.updateMany(state,action.payload)
            })    
    },
})

export default taskSlice.reducer