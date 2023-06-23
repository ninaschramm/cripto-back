import { User } from "@/utils/types";
import { db } from "../db/mongo";
import { ObjectId } from "mongodb";

async function getUserInfo(userId: ObjectId) {
    userId = new ObjectId(userId)
    const user = await db.collection('users').findOne({_id: userId},
        { projection: { password: 0 } });
    return user
}

async function updateUserInfo(userId: ObjectId, image?: string, description?: string) {    
    userId = new ObjectId(userId)
    const user = await getUserInfo(userId);
    const newImage = image || user.image;
    const newDescription = description || user.description;
    const updatedInfo = await db.collection('users').updateOne(
        { _id: userId },
        { $set: { image: newImage, description: newDescription } }
      );
      return updatedInfo
}

const userRepository = {
    getUserInfo,
    updateUserInfo
}

export default userRepository