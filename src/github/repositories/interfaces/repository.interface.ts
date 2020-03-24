import { Document } from 'mongoose';

export interface Repository extends Document {
  readonly name: string;
}
