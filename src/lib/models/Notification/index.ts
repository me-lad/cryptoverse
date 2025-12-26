// 📦 Third-Party imports
import mongoose, { Model } from 'mongoose';

// 📦 Internal imports
import type { NotificationDocumentType } from './types';
import { hoursToMillisecond } from '~helpers/time';

class NotificationModel {
  private schema;
  public model: Model<NotificationDocumentType>;

  constructor() {
    this.schema = this.createSchema();
    this.model = this.createModel();
  }

  private createModel(): Model<NotificationDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.Notification as Model<NotificationDocumentType>) ||
      mongoose.model<NotificationDocumentType>('Notification', this.schema)
    );
  }

  private createSchema() {
    const Schema = mongoose.Schema;
    const notificationSchema = new Schema<NotificationDocumentType>(
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          index: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        hasRead: {
          type: Boolean,
          required: false,
          default: false,
        },
        expiresAt: {
          type: Date,
          default: () => new Date(Date.now() + hoursToMillisecond(12)),
          index: { expireAfterSeconds: 0 },
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      },
    );

    return notificationSchema;
  }
}

export default new NotificationModel();
