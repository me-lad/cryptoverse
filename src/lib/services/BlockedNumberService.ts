// Directives
import "server-only";

// Packages imports
import mongoose from "mongoose";

// Local imports
import { connectToDB } from "../configs/mongoose";
import BlockedNumberModel from "../models/BlockedNumber";

class BlockedNumberService {
  constructor() {
    this.initializeModel();
  }

  async initializeModel() {
    await connectToDB();
    if (!mongoose.models.Session) await BlockedNumberModel.model.init();
  }

  async blockNumber(phoneNumber: string) {
    return await BlockedNumberModel.model.create({ phoneNumber });
  }

  async checkBlockStatus(phoneNumber: string): Promise<"Blocked" | "Not-Blocked"> {
    const isBlocked = await BlockedNumberModel.model.findOne({ phoneNumber });
    return isBlocked ? "Blocked" : "Not-Blocked";
  }
}

export default new BlockedNumberService();
