import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { RepositoryMongoDB } from './repository'
import { Service } from './service';
import { Http } from './http';

const app = express()
app.use(express.urlencoded());
app.use(cors({
    origin: 'http://localhost:3001'
  }));

const connectionString = 'mongodb://user:user@localhost:27017';
const client = new MongoClient(connectionString);
client.connect();

const db = client.db("test");
const repo = new RepositoryMongoDB(db);
const service = new Service(repo);
const http = new Http(service, app);
http.listen();
