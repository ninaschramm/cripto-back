import { Db, MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { loadEnv } from "../config/envs";

dotenv.config();
loadEnv();

let db: Db = null;
const mongoClient = new MongoClient(process.env.MY_URL_MONGO);
const promise = mongoClient.connect();
promise.then(() => console.log("Connected to database"))
db = mongoClient.db(process.env.MY_MONGO_DB);

export { db, mongoClient };