import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { RepositoryMongoDB } from './repository'
import { Service } from './service';
import { Http } from './http';

(async function start() {
  const app = express()
  app.use(express.urlencoded());
  app.use(cors({
      origin: '*'
    }));

  const connectionString = 'mongodb://user:user@mongodb:27017';
  const client = new MongoClient(connectionString);
  await client.connect();

  const db = client.db("test");
  const repo = new RepositoryMongoDB(db);
  const service = new Service(repo);
  const http = new Http(service, app);
  http.listen();
}())
