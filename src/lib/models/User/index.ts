// 📦 Third-Party imports
import mongoose, { Model } from 'mongoose';

// 📦 Internal imports
import type { UserDocumentType } from './types';
import { UserRolesEnum } from '../types';
import { hoursToMillisecond } from '~helpers/time';
import { connectToDB } from '~vendors/mongoose';

class UserModel {
  private schema;
  public model;

  constructor() {
    this.schema = this.createSchema();
    this.attachHooks();
    this.model = this.createModel();
    this.createTTLIndex();
  }

  private createModel(): Model<UserDocumentType> {
    this.schema ||= this.createSchema();
    return (
      (mongoose.models.User as Model<UserDocumentType>) ||
      mongoose.model<UserDocumentType>('User', this.schema)
    );
  }

  private createSchema() {
    const Schema = mongoose.Schema;
    return new Schema<UserDocumentType>(
      {
        username: {
          type: String,
          required: true,
          unique: true,
          index: true,
        },
        phoneNumber: {
          type: String,
          required: true,
          unique: true,
          index: true,
        },
        password: {
          type: String,
          required: true,
        },
        profileImage: {
          type: String,
        },
        role: {
          type: String,
          enum: UserRolesEnum,
          default: 'User',
        },
        isVerified: {
          type: Boolean,
          default: false,
        },
        isRestricted: {
          type: Boolean,
          default: false,
        },
        refreshToken: {
          type: String,
        },
        refreshTokenExpiresAt: {
          type: Date,
        },
        sessionId: {
          type: Schema.Types.ObjectId,
          ref: 'Session',
        },
        expiresAt: {
          type: Date,
        },
        passwordChangedAt: {
          type: Date,
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
    this.schema.pre('save', async function () {
      if (!this.isVerified && !this.expiresAt) {
        this.expiresAt = new Date(Date.now() + hoursToMillisecond(24));
      }
    });
  }

  private async createTTLIndex() {
    await connectToDB();
    this.model ||= this.createModel();
    try {
      await this.model.collection.createIndex(
        {
          expiresAt: 1,
        },
        {
          expireAfterSeconds: 0,
          partialFilterExpression: { isVerified: false },
        },
      );
      console.log('TTL index for unverified users created.');
    } catch (err) {
      console.log('Failed to create TTL index:', err);
    }
  }
}

export default new UserModel();
