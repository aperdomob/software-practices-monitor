import * as mongoose from 'mongoose';

export const RepositorySchema = new mongoose.Schema({
  name: String,
}, {
  strict: false
});
