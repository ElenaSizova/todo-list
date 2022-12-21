import { ObjectId } from 'mongodb'

export type ListId = ObjectId;

export type TaskId = ObjectId;

export interface Task {
    _id: TaskId,
    content: string,
    isCompleted: boolean,
    listId: ListId
}

export interface List {
    _id: ListId
}
