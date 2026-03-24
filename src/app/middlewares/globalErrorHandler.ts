import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApiError';
import handleZodError from '../errors/handleZodError';
import { IErrorSources } from '../errors/error.interface';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: IErrorSources = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.env === 'development' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
