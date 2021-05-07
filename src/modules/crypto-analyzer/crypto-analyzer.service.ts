import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST } from 'src/utils/paths';
import { RequestService } from '../network/request.service';
import { NotifyService } from '../notify/notify.service';
// import { dummy } from './dummy';


@Injectable()
export class CryptoAnalyzerService  {

  constructor(
      private readonly requestService: RequestService,
      private readonly notifyService: NotifyService,
  ) {}

  @Cron('*/45 * * * *')
  async getCryptos() {
    const query = `${CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST}?start=1&limit=200`
    const data = await this.requestService.get(query)
    // const data = dummy;
    const potentials = data?.filter(this.checkRate)
    this.notifyService.publish(potentials)
    return potentials;
  }

   checkRate(currency) {
    return currency.quote?.['USD']?.percent_change_1h > 10
    }


}
