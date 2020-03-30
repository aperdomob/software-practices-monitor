import * as mongoose from 'mongoose';

export const RepositorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    strict: false,
  },
);
