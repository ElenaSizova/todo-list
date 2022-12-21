import {createAsyncThunk} from "@reduxjs/toolkit";
import { normalize } from 'normalizr'
import {client} from '../app/client'
import {Task, TaskEntities, TaskId, taskSchema} from '../entities/task/task';

const API_URL = 'http://localhost:3000';

export type NormalizedTasksPayload = {
    entities: {
        tasks: { [index: TaskId]: Task }
    }
    result: TaskId[],
}

const normalizeTasks = (data: any) => {
    return normalize<
            Task,
            {tasks: TaskEntities }
    >(data, taskSchema);
}

async function createListQuery(content: string) {
    return await client.post(`${API_URL}/list`, {content})
}

async function createTaskQuery(listId: string, content: string) {
    const taskId = await client.post(`${API_URL}/list/${listId}/task`, {content})
    const task = await client.get(`${API_URL}/task/${taskId}`)
    const normalized = normalizeTasks([task])

    return normalized.entities.tasks[taskId];
}

async function getTasksByListIdQuery(listId: string) {
    const data = await client.get(`${API_URL}/list/${listId}/task`)
    const normalized = normalizeTasks(data)

    return normalized  as NormalizedTasksPayload
}

async function updateTaskQuery(taskId: TaskId, isCompleted: boolean) {
    return await client.put(`${API_URL}/task/${taskId}`, {isCompleted})
}

async function completeAllTasksListIdQuery(listId: string) {
    await client.get(`${API_URL}/list/${listId}/completeAllTasks`)
    const data = await client.get(`${API_URL}/list/${listId}/task`)
    const normalized = normalizeTasks(data)

    const updates = Object.values(normalized.entities.tasks)
        .map((task: Task) => ({id: task.id, changes: {isCompleted: true}}))     

    return updates
}

export const createList = createAsyncThunk(
    'create/list',
    async ({content}: {content: string}): Promise<string> => createListQuery(content)
)

export const createTask = createAsyncThunk(
    'create/task',
    async ({listId, content}: {listId: string, content: string}): Promise<Task> => createTaskQuery(listId, content)
)

export const getTasksByListId = createAsyncThunk(
    'get/tasksByListId',
    async ({listId}: {listId: string}): Promise<NormalizedTasksPayload> => getTasksByListIdQuery(listId)
)

export const updateTask = createAsyncThunk(
    'update/task',
    async ({taskId, isCompleted}: {taskId: TaskId, isCompleted: boolean}) => updateTaskQuery(taskId, isCompleted)
)

export const completeAllTasksListId = createAsyncThunk(
    'update/completeAlltask',
    async ({listId}: {listId: string}) => completeAllTasksListIdQuery(listId)
)