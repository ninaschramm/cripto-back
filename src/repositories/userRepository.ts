import { User } from "@/utils/types";
import db from "../db/mongo";
import { ObjectId } from "mongodb";

async function getUserInfo(userId: ObjectId) {
    userId = new ObjectId(userId)
    const user = await db.collection('users').findOne({_id: userId},
        { projection: { password: 0 } });
    return user
}

const userRepository = {
    getUserInfo
}

export default userRepository