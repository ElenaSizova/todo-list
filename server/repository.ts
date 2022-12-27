import { ObjectId, Db } from 'mongodb'
import { 
    ListId,
    TaskId,
    Task,
    TaskIdMongoDB,
    ListIdMongoDB,
    TaskMongoDB,
    fromMongoDBTaskId,
    toMongoDBTaskId,
    fromMongoDBListId,
    toMongoDBListId,
    fromMongoDBTask
} from './entities'

export interface RepositoryInterface {
    createList: () => Promise<ListId>,
    createTask: ({listId, content}: {listId: ListId, content: string}) => Promise<TaskId>,
    getTasksByListId: ({listId}: {listId: ListId})  => Promise<Task[]>,
    getTask: (taskId: {taskId: TaskId}) =>  Promise<Task | null>,
    updateTask: ({taskId, isCompleted}: {taskId: TaskId, isCompleted: boolean}) => Promise<number>,
    completeTasksByListId: ({listId}: {listId: ListId})  => Promise<number>,
}

export class RepositoryMongoDB implements RepositoryInterface {
    db: Db

    constructor(db: Db) {
        this.db = db;
    }

    async createList(): Promise<ListId> {
        const listId:ListIdMongoDB = (await this.db.collection("list").insertOne({})).insertedId;

        return fromMongoDBListId(listId);
    }

    async createTask({content, listId}: {listId: ListId, content: string}): Promise<TaskId>{
        const taskId:TaskIdMongoDB = (await this.db.collection("tasks").insertOne({ content, listId: toMongoDBListId(listId), isCompleted: false })).insertedId;

        return fromMongoDBTaskId(taskId);
    }

    async getTasksByListId({listId}: {listId: ListId}): Promise<Task[]> {
        const tasks = await this.db.collection("tasks").find<TaskMongoDB>({listId: toMongoDBListId(listId)}).toArray();

        return tasks.map(t => fromMongoDBTask(t));
    }

    async getTask({taskId}: {taskId: TaskId}):Promise<Task | null> {
        const task = await this.db.collection("tasks").findOne<TaskMongoDB>({"_id" : toMongoDBTaskId(taskId)})

        if (task === null) {
            return null;
        }

        return fromMongoDBTask(task);
    }

    async updateTask({taskId, isCompleted}: {taskId: TaskId, isCompleted: boolean}): Promise<number> {
        return (await this.db.collection("tasks").updateOne({"_id" : toMongoDBTaskId(taskId)}, { $set: {isCompleted }})).modifiedCount;
    }

    async completeTasksByListId({listId}: {listId: ListId}): Promise<number> {
        return (await this.db.collection("tasks").updateMany({listId: toMongoDBListId(listId)}, { $set: {isCompleted: true }})).modifiedCount;
    }
}