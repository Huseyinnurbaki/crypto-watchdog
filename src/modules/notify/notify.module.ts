import { Module } from '@nestjs/common';
import { RequestModule } from '../network/request.module';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';


@Module({
  imports: [RequestModule],
  controllers: [NotifyController],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}