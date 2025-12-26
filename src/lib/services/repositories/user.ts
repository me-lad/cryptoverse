// 📌 Directives
import 'server-only';

// 📦 Third-Party imports
import mongoose, { Schema } from 'mongoose';

// 📦 Internal imports
import { connectToDB } from '~vendors/mongoose';
import UserModel from '~models/User';
import { SessionServices } from './session';
import { NotificationServices } from './notification';

// 🧠 Ensure DB is connected and model is initialized
const initializeUserModel = async () => {
  await connectToDB();
  if (!mongoose.models.User) await UserModel.model.init();
};

// 🔍 Get user by identifier
const getUserDataByIdentifier = async (
  identifier: string,
  requiredData?: string,
) => {
  await initializeUserModel();
  return UserModel.model.findOne(
    { $or: [{ username: identifier }, { phoneNumber: identifier }] },
    requiredData && requiredData,
  );
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

const addSessionToUser = async (
  userId: string,
  sessionDocumentId: string,
  deviceId: string,
) => {
  try {
    await initializeUserModel();

    const sessionObj = { sessionId: sessionDocumentId, deviceId };

    await UserModel.model.updateOne(
      { _id: userId },
      { $addToSet: { sessions: sessionObj } },
      { new: true },
    );
  } catch (err: any) {
    console.log(err);
  }
};

const removeSessionFromUserByDevice = async (
  userId: string,
  deviceId: string,
) => {
  await initializeUserModel();

  await UserModel.model.updateOne(
    { _id: userId },
    { $pull: { sessions: { deviceId: String(deviceId) } } },
  );
};

const getUserNotifications = async (userId: string) => {
  const userData = await UserModel.model
    .findOne({ _id: userId })
    .populate('notifications');

  return userData ? userData.notifications : [];
};

const deleteUserAccount = async (username: string) => {
  const deletedUser = await UserModel.model.findOneAndDelete({ username });
  if (deletedUser) {
    await SessionServices.deleteAllSessions(deletedUser.id);
    await NotificationServices.deleteNotifications(deletedUser.id);
  }
  return deletedUser;
};

// Backwards compatibility alias
const updateUserSessionRelatedFields = addSessionToUser;

export const UserServices = {
  getUserDataByIdentifier,
  getUserDataById,
  countUsers,
  createUser,
  getUserNotifications,
  addSessionToUser,
  removeSessionFromUserByDevice,
  updateUserSessionRelatedFields,
  deleteUserAccount,
} as const;
