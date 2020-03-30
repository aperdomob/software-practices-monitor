import { Document } from 'mongoose';
import { Repository } from '../../interfaces/domain.interfaces';

export interface RepositoryDocument extends Document, Repository {
  name: string;
  lastUpdated: string;
  isPrivate: boolean;
}
