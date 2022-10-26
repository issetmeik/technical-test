import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    address: { type: String },
    addressNumber: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true, collection: 'categories' },
);
