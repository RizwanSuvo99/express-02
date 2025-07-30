import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const middleware = [
  morgan('dev'),
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
];

export default middleware;
