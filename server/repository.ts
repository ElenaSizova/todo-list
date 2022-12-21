import { ObjectId, Db } from 'mongodb'
import { ListId, TaskId, Task } from './entities'

export interface RepositoryInterface {
    createList: () => Promise<ListId>,
    createTask: ({listId, content}: {listId: string | ObjectId, content: string}) => Promise<TaskId>,
    getTasksByListId: ({listId}: {listId: string})  => Promise<Task[]>,
    getTask: (taskId: {taskId: string}) =>  Promise<Task | null>,
    updateTask: ({taskId, isCompleted}: {taskId: string, isCompleted: boolean}) => Promise<TaskId>,
    completeTasksByListId: ({listId}: {listId: string})  => Promise<{}>,
}

export class RepositoryMongoDB implements RepositoryInterface {
    db: Db

    constructor(db: Db) {
        this.db = db;
    }

    async createList() {
        return (await this.db.collection("list").insertOne({})).insertedId;
    }

    async createTask({content, listId}: {listId: string | ObjectId, content: string}) {
        return (await this.db.collection("tasks").insertOne({ content, listId, isCompleted: false })).insertedId;
    }

    async getTasksByListId({listId}: {listId: string}) {
        return await this.db.collection("tasks").find<Task>({listId: { $in: [listId, new ObjectId(listId)]}}).toArray();
    }

    async getTask({taskId}: {taskId: string}) {
        return await this.db.collection("tasks").findOne<Task>({"_id" : new ObjectId(taskId)})
    }

    async updateTask({taskId, isCompleted}: {taskId: string, isCompleted: boolean}) {
        return (await this.db.collection("tasks").updateOne({"_id" : new ObjectId(taskId)}, { $set: {isCompleted }})).upsertedId
    }

    async completeTasksByListId({listId}: {listId: string}) {
        return await this.db.collection("tasks").updateMany({listId: { $in: [listId, new ObjectId(listId)]}}, { $set: {isCompleted: true }});
    }
}