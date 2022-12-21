import { createSlice } from '@reduxjs/toolkit'
import { createTask } from '../../effects/todoListEffect'

export enum Status {
    Idle = "IDLE",
    Loading = "LOADING",
    Failed = "FAILED",
}

export type AddTaskState = {
    status: Status
    error: string
}

const initialState: AddTaskState = {
    status: Status.Idle,
    error: '',
}

export const addTaskSlice = createSlice({
    name: 'addTask',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.status = Status.Loading
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = Status.Idle
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = Status.Failed
                state.error = action.error.message || 'failed to add item'
            })
    },
})

export default addTaskSlice.reducer