import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CONFIGURATION_KEYS,
  CONFIGURATION_SCHEMA,
} from './ConfigurationSchema';
import { QuestionsModule } from './questions/questions.module';
import { TestRunsModule } from './test-runs/test-runs.module';
import { TestRunResultsModule } from './test-run-results/test-run-results.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: CONFIGURATION_SCHEMA,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(CONFIGURATION_KEYS.DATABASE_URL),
      }),
      inject: [ConfigService],
    }),
    QuestionsModule,
    TestRunsModule,
    TestRunResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule],
})
export class AppModule {}
