
import {schema} from "normalizr";

export type TaskId = string;

export interface Task {
    id: TaskId,
    content: string,
    isCompleted: boolean,
    listId: string
}

export type TaskEntities = {
    [index: TaskId]: Task,
}

export type TaskState = {
    ids: TaskId[],
    entities: TaskEntities
}


const taskEntity = new schema.Entity<Task>('tasks', {}, {
    idAttribute: 'id',
    processStrategy: item => ({
        id: item.id,
        content: item.content,
        isCompleted: item.isCompleted,
        listId: item.listId
    })
})

export const taskSchema = new schema.Array(taskEntity);
