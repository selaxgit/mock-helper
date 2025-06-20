import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CacheService } from 'src/api/cache.service';

@Injectable()
export class MockService {
  constructor(private readonly cacheService: CacheService) {}

  public async handleRequest(
    path: string,
    response: Response,
    request: string,
  ): Promise<void> {
    const cache = await this.cacheService.getByPath(path);
    if (!cache || cache.request !== request) {
      response.status(HttpStatus.NOT_FOUND).send();
    } else {
      response.status(cache.status).json(cache.response);
    }
  }
}
