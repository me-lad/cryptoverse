import mongoose, { Model } from "mongoose";
import type { SessionDocumentType } from "./types";
import { UserRolesEnum } from "../types";
import { daysToMillisecond, hoursToMillisecond } from "@/lib/helpers";

class SessionModel {
  private schema;
  public model;

  constructor() {
    this.schema = this.createSchema();
    this.attachHooks();
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
    const schema = new Schema<SessionDocumentType>(
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
      { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
    );
    schema.virtual("rememberMe");
    return schema;
  }

  async attachHooks() {
    this.schema ||= this.createSchema();
    this.schema.pre("save", function (next) {
      let exp = new Date(Date.now() + hoursToMillisecond(12));
      if (this.rememberMe) {
        exp = new Date(Date.now() + daysToMillisecond(14));
      }
      this.expiresAt = exp;
      next();
    });
  }
}

export default new SessionModel();
