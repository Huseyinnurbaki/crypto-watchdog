import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('notify')
export class NotifyController {

  @Get('/google-chat')
  async getTGPreviousOrders() {
    const abc = 'cf';
    return abc;
  }
}
