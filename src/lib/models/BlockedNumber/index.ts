// Packages imports
import mongoose, { Model } from "mongoose";

// Local imports
import { BlockSourcesEnum, type BlockedNumberDocumentType } from "./types";

class BlockedNumberModel {
  private schema;
  public model;

  constructor() {
    this.schema = this.createSchema();
    this.model = this.createModel();
  }

  private createModel(): Model<BlockedNumberDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.BlockedNumber as Model<BlockedNumberDocumentType>) ||
      mongoose.model<BlockedNumberDocumentType>("BlockedNumber", this.schema)
    );
  }

  private createSchema() {
    const Schema = mongoose.Schema;
    return new Schema<BlockedNumberDocumentType>(
      {
        phoneNumber: {
          type: String,
          required: true,
          index: true,
          unique: true,
        },
        isPermanent: {
          type: Boolean,
          default: true,
        },
        blockedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        blockedAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
          index: { expires: 0 },
        },
        source: {
          type: String,
          enum: BlockSourcesEnum,
          default: "Otp",
        },
        note: {
          type: String,
        },
      },
      { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
    );
  }
}

export default new BlockedNumberModel();
