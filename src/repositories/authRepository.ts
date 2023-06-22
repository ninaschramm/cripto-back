import { NewUser } from "../types/types";
import db from "../db/mongo";

async function create(data: NewUser) {
    const result = await db.collection('users').insertOne(data);
    return {
        ...data,
        id: result.insertedId
    }
}

// async function getUsers() {
//     const result = await db.collection('users').find().toArray();
//     return result
// }

async function findByEmail(email: string) {
    return db.collection('users').findOne({ email });
}

const authRepository = {
    create,
    findByEmail,
}

export default authRepository