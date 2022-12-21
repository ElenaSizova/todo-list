import { ListId, TaskId, Task } from "./entities"
import {RepositoryInterface} from './repository'

export interface ServiceInterface {
    createList: ({content}: {content: string}) => Promise<{data: ListId | string, status: number}>,
    createTask: ({listId, content}: {listId: string, content: string}) => Promise<{data: TaskId | string, status: number}>,
    getTasksByListId: ({listId}: {listId: string})  => Promise<Task[]>,
    getTask: (taskId: {taskId: string}) =>  Promise<{data: Task | null, status: number}>,
    updateTask: ({taskId, isCompleted}: {taskId: string, isCompleted: boolean}) => Promise<{data: TaskId | string, status: number}>,
    completeTasksByListId: ({listId}: {listId: string})  => Promise<{data: {}, status: number}>,
}

export class Service implements ServiceInterface {
    repo: RepositoryInterface

    constructor(repo: RepositoryInterface) {
        this.repo = repo;
    }

    async createList({content}: {content: string}) {
        if (content === '') {
            return Promise.resolve({status: 400, data: 'Content is empty'});
        }
       
        const listId = await this.repo.createList();
        const taskId = await this.repo.createTask({listId, content});

        return {status: 200, data: listId};
    }

    async createTask({content, listId}: {listId: string, content: string}) {
        if (content === '') {
            return Promise.resolve({status: 400, data: 'Content is empty'});
        }

        const taskId = await this.repo.createTask({listId, content});
        return {status: 200, data: taskId};
    }

    async getTasksByListId({listId}: {listId: string}) {
        return await this.repo.getTasksByListId({listId});
    }

    async getTask({taskId}: {taskId: string}) {
        const task = await this.repo.getTask({taskId});

        if (task === null) {
            return {status: 404, data: null};
        }

        return {status: 200, data: task};
    }

    async updateTask({taskId, isCompleted}: {taskId: string, isCompleted: boolean}){
        const updatedTaskId = await this.repo.updateTask({taskId, isCompleted});

        return {status: 200, data: updatedTaskId};
    }

    async completeTasksByListId({listId}: {listId: string}) {
        await this.repo.completeTasksByListId({listId});

        return {status: 200, data: {}};
    }
}