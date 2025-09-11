import mongoose, { Model } from "mongoose";
import type { SessionDocumentType } from "./types";
import { UserRolesEnum } from "../types";
import { daysToMillisecond, hoursToMillisecond } from "~helpers/time";

class SessionModel {
  private schema;
  public model;

  constructor() {
    this.schema = this.createSchema();
    this.model = this.createModel();
  }

  createModel(): Model<SessionDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.Session as Model<SessionDocumentType>) ||
      mongoose.model<SessionDocumentType>("Session", this.schema)
    );
  }

  createSchema() {
    const Schema = mongoose.Schema;
    return new Schema<SessionDocumentType>(
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          unique: true,
          index: true,
        },
        role: {
          type: String,
          enum: UserRolesEnum,
          required: true,
        },
        expiresAt: {
          type: Date,
          index: { expires: 0 },
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      },
    );
  }
}

export default new SessionModel();
