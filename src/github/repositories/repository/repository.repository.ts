import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { RepositoryDocument } from '../interfaces/repository.document';
import { RepositoryDto } from '../dto/repository.dto';

@Injectable()
export class RepositoryRepository {
  constructor(
    @InjectModel('Repository')
    private repositoryModel: Model<RepositoryDocument>,
  ) {}

  public async deleteAll() {
    await this.repositoryModel.deleteMany({}).exec();
  }

  async saveAll(repositoriesDto: RepositoryDto[]): Promise<RepositoryDto[]> {
    const docs = repositoriesDto.map(dto => new this.repositoryModel(dto));

    await this.repositoryModel.collection.insertMany(docs);

    return repositoriesDto;
  }

  async create(repositoryDto: RepositoryDto): Promise<RepositoryDocument> {
    const newObject = new this.repositoryModel(repositoryDto);

    return newObject.save();
  }

  public async getAll() {
    const items = await this.repositoryModel.find({}).exec();

    return items.map(item =>
      item.toObject({
        transform: this.transform,
      }),
    );
  }

  public async get({ name }) {
    const repo = await this.repositoryModel.findOne({ name }).exec();

    return repo.toObject({
      transform: this.transform,
    });
  }

  private transform(doc, ret) {
    const trans = { ...ret };
    delete trans._id;
    delete trans.__v;

    return trans;
  }
}
