// Directives
import "server-only";

// Packages imports
import mongoose, { Schema } from "mongoose";

// Local imports
import { connectToDB } from "../configs/mongoose";
import { UserRolesType } from "../models/types";
import SessionModel from "../models/Session";

class SessionService {
  constructor() {
    this.initializeModel();
  }

  async initializeModel() {
    await connectToDB();
    if (!mongoose.models.Session) await SessionModel.model.init();
  }

  async createSession(id: Schema.Types.ObjectId, role: UserRolesType = "User") {
    const data = { userId: id, role };
    return await SessionModel.model.create(data);
  }

  async deleteSession(userId: Schema.Types.ObjectId) {
    await SessionModel.model.deleteOne({ userId });
  }
}

export default new SessionService();
