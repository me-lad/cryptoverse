// 📌 Directives
import 'server-only';

// Package imports
import mongoose from 'mongoose';

// 📦 Internal imports
import { connectToDB } from '~vendors/mongoose';
import { UserRolesType } from '~models/types';
import { daysToMillisecond, hoursToMillisecond } from '~helpers/time';
import SessionModel from '~models/Session';

// 🧠 Ensure DB is connected and model is initialized
const initializeSessionModel = async () => {
  await connectToDB();
  if (!mongoose.models.Session) await SessionModel.model.init();
};

// 🔍 Get session by user ID
const getCurrentSessionByUserId = async (userId?: string) => {
  if (!userId) return null;
  await initializeSessionModel();
  return SessionModel.model.findOne({ userId });
};

// 🔍 Get session by session ID
const getCurrentSessionById = async (id?: string) => {
  if (!id) return null;
  await initializeSessionModel();
  return SessionModel.model.findOne({ _id: id });
};

// 🆕 Create a new session
const createSession = async (
  id: string,
  role: UserRolesType,
  remember?: 'on',
) => {
  await initializeSessionModel();

  const expTime = remember ? daysToMillisecond(14) : hoursToMillisecond(12);
  const expiresAt = new Date(Date.now() + expTime);

  return SessionModel.model.create({ userId: id, role, expiresAt });
};

// ❌ Delete session by user ID
const deleteSession = async (userId: string) => {
  await initializeSessionModel();
  await SessionModel.model.deleteOne({ userId });
};

export const SessionServices = {
  getCurrentSessionById,
  getCurrentSessionByUserId,
  createSession,
  deleteSession,
} as const;
