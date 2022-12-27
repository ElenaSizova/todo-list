import { ListId, TaskId, Task, List } from "./entities"
import {RepositoryInterface} from './repository'

export enum QueryStatus {
    SUCCESS = 'SUCCESS',
    NOT_FOUND = 'NOT_FOUND',
    INVALID_DATA = 'INVALID_DATA',
}

export interface ServiceInterface {
    createList: ({content}: {content: string}) => Promise<{data: ListId, status: QueryStatus}>,
    createTask: ({listId, content}: {listId: ListId, content: string}) => Promise<{data: TaskId, status: QueryStatus}>,
    getTasksByListId: ({listId}: {listId: ListId})  => Promise<{data: Task[], status: QueryStatus}>,
    getTask: (taskId: {taskId: TaskId}) => Promise<{data: Task | null, status: QueryStatus}>,
    updateTask: ({taskId, isCompleted}: {taskId: TaskId, isCompleted: boolean}) => Promise<{data: number, status: QueryStatus}>,
    completeTasksByListId: ({listId}: {listId: ListId})  => Promise<{data: number, status: QueryStatus}>,
}

export class Service implements ServiceInterface {
    repo: RepositoryInterface

    constructor(repo: RepositoryInterface) {
        this.repo = repo;
    }

    async createList({content}: {content: string}): Promise<{data: ListId, status: QueryStatus}> {
        if (content === '') {
            return Promise.resolve({status: QueryStatus.INVALID_DATA, data: 'Content is empty'});
        }
       
        const listId = await this.repo.createList();
        const taskId = await this.repo.createTask({listId, content});

        return {status: QueryStatus.SUCCESS, data: listId};
    }

    async createTask({content, listId}: {listId: ListId, content: string}): Promise<{data: TaskId, status: QueryStatus}> {
        if (content === '') {
            return Promise.resolve({status: QueryStatus.INVALID_DATA, data: 'Content is empty'});
        }

        const taskId = await this.repo.createTask({listId, content});
        return {status: QueryStatus.SUCCESS, data: taskId};
    }

    async getTasksByListId({listId}: {listId: ListId}):Promise<{data: Task[], status: QueryStatus}> {
        const tasks = await this.repo.getTasksByListId({listId});

        return {status: QueryStatus.SUCCESS, data: tasks};
    }

    async getTask({taskId}: {taskId: TaskId}):Promise<{data: Task | null, status: QueryStatus}> {
        const task = await this.repo.getTask({taskId});

        if (task === null) {
            return {status: QueryStatus.NOT_FOUND, data: null};
        }

        return {status: QueryStatus.SUCCESS, data: task};
    }

    async updateTask({taskId, isCompleted}: {taskId: TaskId, isCompleted: boolean}):Promise<{data: number, status: QueryStatus}> {
        const updateCount = await this.repo.updateTask({taskId, isCompleted});

        return {status: QueryStatus.SUCCESS, data: updateCount};
    }

    async completeTasksByListId({listId}: {listId: ListId}):Promise<{data: number, status: QueryStatus}> {
        const updateCount = await this.repo.completeTasksByListId({listId});

        return {status: QueryStatus.SUCCESS,data: updateCount};
    }
}