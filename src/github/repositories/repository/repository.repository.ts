import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { RepositoryDocument } from '../interfaces/repository.document';
import { RepositoryDto } from '../dto/repository.dto';

@Injectable()
export class RepositoryRepository {
  constructor(
    @InjectModel('Repository') private repositoryModel: Model<RepositoryDocument>,
  ) {}

  async create(repositoryDto: RepositoryDto): Promise<RepositoryDocument> {
    const newObject = new this.repositoryModel(repositoryDto);

    return newObject.save();
  }
}
