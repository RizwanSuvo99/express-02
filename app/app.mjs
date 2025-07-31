import dotenv from 'dotenv';
import express from 'express';
import myDB from '../db/db.mjs';
import { errorHandler, notFoundHandler } from './error.mjs';
import middleware from './middleware.mjs';
import router from './routes.mjs';

dotenv.config();
const app = express();

app.use(middleware);
app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
