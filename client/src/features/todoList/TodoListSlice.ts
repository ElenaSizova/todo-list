import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createList } from '../../effects/todoListEffect'

export type AddTaskState = {
    listId: string
}

export const todoLostSlice = createSlice({
    name: 'todoLost',
    initialState: {
        listId: ''
    },
    reducers: {
        setListId(state, action: PayloadAction<string>) {
            state.listId = action.payload
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createList.fulfilled, (state, action) => {
                state.listId = action.payload;
            })
    },
})

export const { setListId } = todoLostSlice.actions
export default todoLostSlice.reducer