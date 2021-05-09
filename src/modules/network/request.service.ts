import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
  constructor(private httpService: HttpService) {}

  async request<T = any>(options): Promise<T> {
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY || '',
        ...options?.headers,
      },
      json: true,
      gzip: true,
    };

    try {
      const response = await this.httpService.request(config).toPromise();
      return response?.data;
    } catch (error) {
      return error?.response;
    }
  }

  async get<T = any>(url, config?): Promise<T> {
    const options = {
      url,
      method: 'GET',
      ...config,
    };

    return await this.request<T>(options);
  }

  async post<T = any>(url, data?, config?): Promise<T> {
    const options = {
      url,
      method: 'POST',
      data,
      ...config,
    };

    return await this.request<T>(options);
  }
}
