import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MethodEntity, SectionEntity } from './entity';
import { Repository } from 'typeorm';

export interface ICache {
  request: string;
  status: number;
  response: any;
}

@Injectable()
export class CacheService {
  private cache: Map<string, ICache> | null = null;

  constructor(
    @InjectRepository(SectionEntity)
    private readonly sectionsRepository: Repository<SectionEntity>,
    @InjectRepository(MethodEntity)
    private readonly methodsRepository: Repository<MethodEntity>,
  ) {}

  public clearCache(): void {
    this.cache = null;
  }

  public async getByPath(path: string): Promise<ICache | null> {
    if (!this.cache) {
      await this.initCache();
    }
    return this.cache.get(path) ?? null;
  }

  private async initCache(): Promise<void> {
    this.cache = new Map();
    const sections = await this.sectionsRepository.find();
    const methods = await this.methodsRepository.find();
    for (const method of methods) {
      const keys: string[] = [];
      if (method.sectionId) {
        const section = sections.find((i) => i.id === method.sectionId);
        if (section) {
          keys.push(section.url);
        }
      }
      keys.push(method.method);
      let response = {};
      try {
        response = JSON.parse(method.response);
      } catch (e) {}
      this.cache.set(keys.join('/'), {
        request: method.request,
        status: method.status,
        response,
      });
    }
  }
}
