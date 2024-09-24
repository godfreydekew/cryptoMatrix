//config/db.js
import 'dotenv/config';
import mongoose from 'mongoose';


/**
 * Asynchronous function to connect to the MongoDB database using the URI 
 * specified in the environment variables.
 * 
 * This function attempts to establish a connection to the MongoDB database. If the connection
 * is successful, it logs the host of the connected database. In case of an error, it logs the 
 * error message and exits the process.
 * 
 * @async
 * @function connectDB
 * @throws Will throw an error if unable to connect to the database.
 */

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
