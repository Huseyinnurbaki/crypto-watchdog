import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CryptoAnalyzerService } from './crypto-analyzer.service';

@Controller()
export class CryptoAnalyzerController {
  constructor(private readonly cas: CryptoAnalyzerService) {}

  @Get('cryptocurrencies')
  async getCryptocurrencies() {
    const res = await this.cas.getCryptos();
    return res;
  }

  @Get('newbies')
  async getNewbies() {
    const res = await this.cas.getNewbies();
    return res;
  }
}
