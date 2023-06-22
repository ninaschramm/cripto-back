import { NewUser } from "../utils/types";
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
   const result = await db.collection('users').findOne({ email });
   return result
}

const authRepository = {
    create,
    findByEmail,
}

export default authRepository