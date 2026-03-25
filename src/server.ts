import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

let server: Server;

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  if (server) {
    server.close(() => {
      console.error('Server closed due to unhandled rejection');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

/**
 * Starts the database connection and express server.
 */
const startServer = async () => {
  try {
    const uri = config.db_url;
    if (!uri) {
      throw new Error('Database URL is not defined in environment variables.');
    }
    await mongoose.connect(uri as string);
    console.log('✔️ Connected to the database successfully');

    server = app.listen(config.port, () => {
      console.log(`🚀 Application is running on port http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
};

// Bootstrap the application
(async () => {
  await startServer();
})();

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close(() => {
      console.log('Server closed due to SIGTERM');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  if (server) {
    server.close(() => {
      console.log('Server closed due to SIGINT');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
