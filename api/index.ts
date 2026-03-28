import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/app/config';

// Cache the database connection across serverless function invocations
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }
    try {
        const dbUri = config.db_url;
        if (!dbUri) throw new Error('Database URL is not set');

        await mongoose.connect(dbUri);
        isConnected = true;
        console.log('=> connected to database successfully');
    } catch (error) {
        console.error('=> error connecting to database', error);
    }
};

// Start the connection immediately but also export the Express app
export default async (req: any, res: any) => {
    await connectDB();
    return app(req, res);
};