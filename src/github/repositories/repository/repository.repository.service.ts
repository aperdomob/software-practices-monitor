import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '../interfaces/repository.interface';
import { RepositoryDto } from '../dto/repository.dto';

@Injectable()
export class RepositoryRepositoryService {
  constructor(@InjectModel('Repository') private repositoryModel: Model<Repository>) {}

  async create(repositoryDto: RepositoryDto): Promise<Repository> {
    const newObject = new this.repositoryModel(repositoryDto);

    return newObject.save();
  }
}
