import {
  HttpService,
  Module,
  OnModuleInit,
  Logger,
  HttpModule,
} from '@nestjs/common';
import { RequestService } from './request.service';

@Module({
  imports: [HttpModule],
  providers: [RequestService],
  exports: [HttpModule, RequestService],
})
export class RequestModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const axios = this.httpService.axiosRef;

    const logger = new Logger('RequestService');

    axios.interceptors.request.use((config) => {
      config['metadata'] = {
        ...config['metadata'],
        startDate: new Date(),
      };
      logger.log(
        `[REQUEST]  ${config.method.toUpperCase()}  ${config.url}`,
      );

      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();
        const { data } = response;
        if (!data || !data.code || data?.code === 200) {
          logger.log(
            `[RESPONSE] ${config.method.toUpperCase()} ${
              config.url
            } ${duration}ms`,
          );
        }
        return response;
      },
      (err) => {
        logger.error(JSON.stringify(err));
        return Promise.reject(err);
      },
    );
  }
}
