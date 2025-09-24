import mongoose, { Model } from "mongoose";
import type { SupportMessageDocumentType } from "./types";

class SupportMessageModel {
  private schema;
  public model;

  constructor() {
    this.schema = this.createSchema();
    this.model = this.createModel();
  }

  createModel(): Model<SupportMessageDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.SupportMessage as Model<SupportMessageDocumentType>) ||
      mongoose.model<SupportMessageDocumentType>("SupportMessage", this.schema)
    );
  }

  createSchema() {
    const Schema = mongoose.Schema;
    return new Schema<SupportMessageDocumentType>(
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      },
    );
  }
}

export default new SupportMessageModel();
