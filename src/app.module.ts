import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubModule } from './github/github.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [GithubModule, MongooseModule.forRoot('mongodb://root:example@localhost', {
    dbName: 'monitor',
    autoCreate: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
