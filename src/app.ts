import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('TheDoctor0101 Backend Server is Running! 🚀');
});

// Application Routes
app.use('/api/v1', router);

// Global Error Handler
app.use(globalErrorHandler);

// Handle Not Found Routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

export default app;
