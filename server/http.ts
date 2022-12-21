import { Express, Request, Response } from 'express';
import { ServiceInterface } from "./service";

const port = 3000

export class Http {
    service: ServiceInterface;
    app: Express;

    constructor(service: ServiceInterface, app: Express) {
        this.service = service;
        this.app = app;
    }

    listen() {
        
        this.app.post('/list', this.createList.bind(this))

        this.app.post('/list/:listId/task', this.createTask.bind(this))
        
        this.app.get('/list/:listId/task', this.getTasksByListId.bind(this))
        
        this.app.get('/task/:taskId', this.getTask.bind(this))

        this.app.put('/task/:taskId', this.updateTask.bind(this))

        this.app.get('/list/:listId/completeAllTasks', this.completeTasksByListId.bind(this))
        
        this.app.listen(port, () => {
          console.log(`Example app listening on port ${port}`)
        })
    }

    async createList (req: Request, res: Response) {
        try {
            const content = req.body.content;    
            const result =  await this.service.createList({content});
        
            res.status(result.status).json(result.data)
            }
        catch (e) {
            res.status(500).json({error: e})
        } 
    }

    async createTask (req: Request, res: Response) {
        try {
            const listId = req.params.listId;
            const content = req.body.content;
            const result =  await this.service.createTask({listId, content});
    
            res.status(result.status).json(result.data)
        }
        catch (e) {
            res.status(500).json({error: e})
        } 
    }

    async getTasksByListId (req: Request, res: Response) {
        try {
            const listId = req.params.listId;
    
            const result =  await this.service.getTasksByListId({listId});
    
            res.status(200).json(result)
        }
        catch (e) {
            res.status(500).json({error: e})
        } 
    }

    async getTask(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId;
            const result =  await this.service.getTask({taskId});
    
            res.status(result.status).json(result.data)
          }
        catch (e) {
            res.status(500).json({error: e})
        } 
    }

    async updateTask(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId;
            const isCompleted = req.body.isCompleted === "true";
            
            const result =  await this.service.updateTask({taskId, isCompleted});
    
            res.status(result.status).json(result.data)
          }
        catch (e) {
            res.status(500).json({error: e})
        } 
    }

    async completeTasksByListId(req: Request, res: Response) {
        try {
            const listId = req.params.listId;
            
            const result =  await this.service.completeTasksByListId({listId});
    
            res.status(result.status).json(result.data)
          }
        catch (e) {
            res.status(500).json({error: e})
        } 
    }
}