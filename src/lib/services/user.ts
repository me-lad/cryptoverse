// 📌 Directives
import 'server-only';

// 📦 Third-Party imports
import mongoose, { Schema } from 'mongoose';

// 📦 Internal imports
import { connectToDB } from '../configs/mongoose';
import { doHash } from '~helpers/hash';
import { daysToMillisecond } from '~helpers/time';
import UserModel from '../models/User';

// 🧠 Ensure DB is connected and model is initialized
const initializeUserModel = async () => {
  await connectToDB();
  if (!mongoose.models.Session) await UserModel.model.init();
};

// 🔍 Get user by identifier
const getUserDataByIdentifier = async (identifier: string) => {
  await initializeUserModel();
  return UserModel.model.findOne({
    $or: [{ username: identifier }, { phoneNumber: identifier }],
  });
};

// 🔍 Get user by id
const getUserDataById = async (id: string) => {
  await initializeUserModel();
  return UserModel.model.findOne({ _id: id });
};

// 📊 Count users
const countUsers = async () => {
  await initializeUserModel();
  return UserModel.model.countDocuments({});
};

// 🆕 Create a new user
const createUser = async (data: any) => {
  await initializeUserModel();
  return UserModel.model.create(data);
};

const updateUserSessionRelatedFields = async (
  userId: Schema.Types.ObjectId,
  refreshToken: string,
  sessionDocumentId: string,
) => {
  try {
    const hashedRefreshToken = await doHash(refreshToken);
    const expDate = new Date(Date.now() + daysToMillisecond(14));

    const result = await UserModel.model.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          refreshToken: hashedRefreshToken,
          refreshTokenExpiresAt: expDate,
          sessionId: sessionDocumentId,
        },
      },
    );
    if (!result) {
      console.log('No user found with that ID — update skipped.');
    }
  } catch (err) {
    console.log('Error in updating user session data ->', err);
  }
};

export const UserServices = {
  getUserDataByIdentifier,
  getUserDataById,
  countUsers,
  createUser,
  updateUserSessionRelatedFields,
} as const;
