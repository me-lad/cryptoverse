// 📌 Directives
import 'server-only';

// Package imports
import mongoose from 'mongoose';

// 📦 Internal imports
import { connectToDB } from '~vendors/mongoose';
import BlockedNumberModel from '../../models/BlockedNumber';

// 🧠 Ensure DB is connected and model is initialized
const initializeBlockedNumberModel = async () => {
  await connectToDB();
  if (!mongoose.models.BlockedNumber) await BlockedNumberModel.model.init();
};

// 🚫 Block a phone number
const blockNumber = async (phoneNumber: string) => {
  await initializeBlockedNumberModel();
  return BlockedNumberModel.model.create({ phoneNumber });
};

// ✅ Check if a number is blocked
const checkBlockStatus = async (
  phoneNumber: string,
): Promise<'Blocked' | 'Not-Blocked'> => {
  await initializeBlockedNumberModel();
  const isBlocked = await BlockedNumberModel.model.findOne({ phoneNumber });
  return isBlocked ? 'Blocked' : 'Not-Blocked';
};

export const BlockedNumberServices = {
  initializeBlockedNumberModel,
  blockNumber,
  checkBlockStatus,
} as const;
