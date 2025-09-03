// Directives
import "server-only";

// Packages imports
import mongoose from "mongoose";

// Local imports
import { OtpUsagesType } from "../models/types";
import { makeRandomCode } from "../helpers";
import { connectToDB } from "../configs/mongoose";
import OtpModel from "../models/Otp";

class OtpService {
  constructor() {
    this.initializeModel();
  }

  async initializeModel() {
    await connectToDB();
    if (!mongoose.models.OTP) await OtpModel.model.init();
  }

  async createOtp(data: any) {
    return await OtpModel.model.create(data);
  }

  async getValidOtp(phoneNumber: string) {
    return await OtpModel.model.findOne({ phoneNumber, expiresAt: { $gte: new Date() } });
  }

  async countExpiredOTPs(phoneNumber: string) {
    return await OtpModel.model.countDocuments({ phoneNumber, expiresAt: { $lte: new Date() } });
  }

  async deleteOTPs(phoneNumber: string) {
    try {
      await OtpModel.model.deleteMany({ phoneNumber });
      return true;
    } catch {
      return false;
    }
  }

  async getLastExpiredOtp(phoneNumber: string) {
    return await OtpModel.model
      .findOne({ phoneNumber, expiresAt: { $lte: new Date() } })
      .sort({ createdAt: -1 });
  }
}

export default new OtpService();
