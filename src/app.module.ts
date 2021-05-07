import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { CryptoAnalyzerModule } from './modules/crypto-analyzer/crypto-analyzer.module';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), CryptoAnalyzerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
