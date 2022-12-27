import { ObjectId } from 'mongodb'

export type ListId = string;

export type TaskId = string;

export interface Task {
    id: TaskId,
    content: string,
    isCompleted: boolean,
    listId: ListId
}

export interface List {
    id: ListId
}

export type ListIdMongoDB = ObjectId;

export type TaskIdMongoDB = ObjectId;

export interface TaskMongoDB {
    _id: TaskIdMongoDB,
    content: string,
    isCompleted: boolean,
    listId: ListIdMongoDB
}

export interface List {
    _id: ListIdMongoDB
}

export function fromMongoDBTaskId(taskId: TaskIdMongoDB): TaskId {
    return taskId.toString();
}

export function toMongoDBTaskId(taskId: TaskId): TaskIdMongoDB {
    return new ObjectId(taskId)
}

export function fromMongoDBListId(listId: TaskIdMongoDB): ListId {
    return listId.toString();
}

export function toMongoDBListId(listId: ListId): TaskIdMongoDB {
    return new ObjectId(listId)
}

export function fromMongoDBTask(task: TaskMongoDB): Task {
    return {
        id: task._id.toString(),
        content: task.content,
        isCompleted: task.isCompleted,
        listId: task.listId.toString()
    }
}

export function toMongoDBTask(task: Task): TaskMongoDB {
    return {
        _id: new ObjectId(task.id),
        content: task.content,
        isCompleted: task.isCompleted,
        listId: new ObjectId(task.listId)
    }
}