// Packages imports
import mongoose, { Model } from "mongoose";

// Local imports
import { OtpUsagesEnum, type OtpDocumentType } from "./types";
import { AuthPatterns } from "@/lib/actions/auth/auth.patterns";
import { AuthMessages } from "@/lib/actions/auth/auth.messages";
import { minutesToMillisecond } from "@/lib/helpers";

class OtpModel {
  private schema;
  public model;
  constructor() {
    this.schema = this.createSchema();
    this.attachHooks();
    this.model = this.createModel();
  }

  private createModel(): Model<OtpDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.Otp as Model<OtpDocumentType>) ||
      mongoose.model<OtpDocumentType>("Otp", this.schema)
    );
  }

  private createSchema() {
    const Schema = mongoose.Schema;
    return new Schema<OtpDocumentType>(
      {
        phoneNumber: {
          type: String,
          required: true,
          validate: {
            validator: (value: string) => AuthPatterns.Phone.test(value),
            message: AuthMessages.Error_InvalidPhoneNumber,
          },
        },
        code: {
          type: String,
          required: true,
        },
        expiresAt: {
          type: Date,
          index: true,
          required: true,
          default: () => new Date(Date.now() + minutesToMillisecond(2)),
        },
        usage: {
          type: String,
          enum: OtpUsagesEnum,
          default: "VERIFY",
        },
        isVerified: {
          type: Boolean,
          default: false,
        },
        usageCount: {
          type: Number,
          default: 0,
        },
      },
      { timestamps: true },
    );
  }

  private attachHooks() {
    this.schema ||= this.createSchema();
    this.schema.pre("save", function (next) {
      if (this.usageCount && this.usageCount >= 3) {
        this.expiresAt = new Date(Date.now() - minutesToMillisecond(2));
      }
      next();
    });
  }
}

export default new OtpModel();
