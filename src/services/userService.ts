import { ObjectId } from "mongodb";
import userRepository from "../repositories/userRepository";
import { User } from "../utils/types";

async function getUserInfo(userId: ObjectId) {
    const result = await userRepository.getUserInfo(userId)
    return result
}

const userService = {
    getUserInfo,
}

export default userService