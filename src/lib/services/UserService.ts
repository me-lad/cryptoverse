// Directives
import "server-only";

// Packages imports
import mongoose from "mongoose";

// Local imports
import { connectToDB } from "../configs/mongoose";
import UserModel from "../models/User";

class UserService {
  constructor() {
    this.initializeModel();
  }

  async initializeModel() {
    await connectToDB();
    if (!mongoose.models.User) await UserModel.model.init();
  }

  async getUserData(identifier: string) {
    return await UserModel.model.findOne({
      $or: [{ username: identifier }, { phoneNumber: identifier }],
    });
  }

  async countUsers() {
    return await UserModel.model.countDocuments({});
  }

  async createUser(data: any) {
    return await UserModel.model.create(data);
  }
}

export default new UserService();
