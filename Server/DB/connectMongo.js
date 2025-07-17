import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config()

const uri = process.env.MONGO_URI;
export const client = new MongoClient(uri);

export async function connectMongoDB(func) {
    try {
        await client.connect();
        await func();
    } finally {
        await client.close();
    }
}
