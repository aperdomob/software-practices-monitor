import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubModule } from './github/github.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RuleEngineModule } from './rule-engine/rule-engine.module';
import configuration from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.development'],
      load: [configuration],
      isGlobal: true,
    }),
    GithubModule,
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}`, {
      dbName: 'monitor',
      autoCreate: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASSWORD,
    }),
    RuleEngineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
