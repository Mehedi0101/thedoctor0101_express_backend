import { ZodError, ZodIssue } from 'zod';
import { IErrorSources, IGenericErrorResponse } from './error.interface';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
