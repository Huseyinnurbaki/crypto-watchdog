import { Module } from '@nestjs/common';
import { RequestModule } from '../network/request.module';
import { NotifyService } from '../notify/notify.service';
import { CryptoAnalyzerController } from './crypto-analyzer.controller';
import { CryptoAnalyzerService } from './crypto-analyzer.service';

@Module({
  imports: [RequestModule],
  controllers: [CryptoAnalyzerController],
  providers: [CryptoAnalyzerService, NotifyService],
  exports: [CryptoAnalyzerService],
})
export class CryptoAnalyzerModule {}
