import { ObjectId } from "mongodb";
import userRepository from "../repositories/userRepository";
import { User } from "../utils/types";

async function getUserInfo(userId: ObjectId) {
    const result = await userRepository.getUserInfo(userId)
    return result
}

async function updateUserInfo(userId: ObjectId, image?: string, description?: string) {
    const result = await userRepository.updateUserInfo(userId, image, description)
    return result
}

const userService = {
    getUserInfo,
    updateUserInfo
}

export default userService