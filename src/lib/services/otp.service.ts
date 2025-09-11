// Directives
import "server-only";

// Package imports
import mongoose from "mongoose";

// Local imports
import { connectToDB } from "../configs/mongoose";
import OtpModel from "../models/Otp";

// 🧠 Ensure DB is connected and model is initialized
const initializeOtpModel = async () => {
  await connectToDB();
  if (!mongoose.models.OTP) await OtpModel.model.init();
};

// 🆕 Create a new OTP
const createOtp = async (data: any) => {
  await initializeOtpModel();
  return OtpModel.model.create(data);
};

// ✅ Get valid OTP (not expired)
const getValidOtp = async (phoneNumber: string) => {
  await initializeOtpModel();
  return OtpModel.model.findOne({
    phoneNumber,
    expiresAt: { $gte: new Date() },
  });
};

// 📊 Count expired OTPs
const countExpiredOTPs = async (phoneNumber: string) => {
  await initializeOtpModel();
  return OtpModel.model.countDocuments({
    phoneNumber,
    expiresAt: { $lte: new Date() },
  });
};

// ❌ Delete all OTPs for a phone number
const deleteOTPs = async (phoneNumber: string) => {
  await initializeOtpModel();
  try {
    await OtpModel.model.deleteMany({ phoneNumber });
    return true;
  } catch {
    return false;
  }
};

// 🕒 Get last expired OTP
const getLastExpiredOtp = async (phoneNumber: string) => {
  await initializeOtpModel();
  return OtpModel.model
    .findOne({
      phoneNumber,
      expiresAt: { $lte: new Date() },
    })
    .sort({ createdAt: -1 });
};

export const OtpService = {
  createOtp,
  getValidOtp,
  countExpiredOTPs,
  deleteOTPs,
  getLastExpiredOtp,
} as const;
