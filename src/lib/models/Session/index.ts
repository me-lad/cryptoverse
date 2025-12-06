import mongoose, { Model } from 'mongoose';

import type { SessionDocumentType } from './types';
import { UserRolesEnum } from '../types';

class SessionModel {
  private schema;
  public model: Model<SessionDocumentType>;

  constructor() {
    this.schema = this.createSchema();
    this.model = this.createModel();
  }

  createModel(): Model<SessionDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.Session as Model<SessionDocumentType>) ||
      mongoose.model<SessionDocumentType>('Session', this.schema)
    );
  }

  createSchema() {
    const Schema = mongoose.Schema;
    return new Schema<SessionDocumentType>(
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          index: true,
        },
        deviceId: {
          type: String,
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
        refreshToken: {
          type: String,
          required: false,
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
