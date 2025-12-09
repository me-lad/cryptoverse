// 📦 Third-Party imports
import mongoose, { Model } from 'mongoose';

// 📦 Internal imports
import type { OtpDocumentType } from './types';
import { OtpUsagesEnum } from '../types';
import { AuthPatterns } from '~constants/patterns';
import { Messages } from '~constants/messages';
import { minutesToMillisecond } from '~helpers/time';

class OtpModel {
  private schema;
  public model: Model<OtpDocumentType>;
  constructor() {
    this.schema = this.createSchema();
    this.attachHooks();
    this.model = this.createModel();
  }

  private createModel(): Model<OtpDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.Otp as Model<OtpDocumentType>) ||
      mongoose.model<OtpDocumentType>('Otp', this.schema)
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
            message: Messages.Error.InvalidPhoneNumber,
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
          default: 'Verify',
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
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      },
    );
  }

  private attachHooks() {
    this.schema ||= this.createSchema();
    this.schema.pre('save', function (next) {
      // @ts-expect-error
      if (this.usage && this.usage === 'ResetPassword') {
        // @ts-expect-error
        this.expiresAt = new Date(Date.now() + minutesToMillisecond(10));
      }
      next();
    });
  }
}

export default new OtpModel();
