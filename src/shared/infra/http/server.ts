import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadconfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import rateLimiter from '../middlewares/RateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(rateLimiter);
app.use(cors({}));
app.use(express.json());
app.use('/files', express.static(uploadconfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Server' });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
