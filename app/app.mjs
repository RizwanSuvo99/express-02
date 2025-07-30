import dotenv from 'dotenv';
import express from 'express';
import myDB from '../db/db.mjs';
import { errorHandler, notFoundHandler } from './error.mjs';
import middleware from './middleware.mjs';
import router from './routes.mjs';

dotenv.config();
const app = express();

myDB.create('User 1', 100);
myDB.create('User 2', 100);
myDB.create('User 3', 100);
myDB.create('User 4', 100);
myDB.create('User 5', 100);      

const bulk = myDB.bulkCreate('User 6', 100, 3);  
const tickets = myDB.find();     
const winners = myDB.draw(2);

app.use(middleware);
app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
