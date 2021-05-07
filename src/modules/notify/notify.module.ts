import { Module } from '@nestjs/common';
import { RequestModule } from '../network/request.module';
import { NotifyService } from './notify.service';

@Module({
  imports: [RequestModule],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}