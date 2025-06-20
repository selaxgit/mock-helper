import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BadRequestDTO,
  MethodDTO,
  MethodFieldsDTO,
  SectionDTO,
  SectionFieldsDTO,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MethodEntity, SectionEntity } from './entity';
import { Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { CacheService } from './cache.service';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(SectionEntity)
    private readonly sectionsRepository: Repository<SectionEntity>,
    @InjectRepository(MethodEntity)
    private readonly methodsRepository: Repository<MethodEntity>,
    private readonly cacheService: CacheService,
  ) {}

  public async getSections(): Promise<SectionDTO[]> {
    return this.sectionsRepository
      .createQueryBuilder('s')
      .orderBy('s.order')
      .getMany();
  }

  public async addSection(dto: SectionFieldsDTO): Promise<SectionDTO> {
    const section = new SectionEntity();
    delete (dto as any).id;
    Object.assign(section, dto);
    const errors = await validate(section);
    if (errors.length > 0) {
      const errorsList: string[] = [];
      errors.forEach((err: ValidationError) => {
        errorsList.push(...Object.values(err.constraints));
      });
      throw new BadRequestException(
        new BadRequestDTO('Есть ошибки валидации', errorsList),
      );
    }
    const ret = await this.sectionsRepository.insert(section);
    this.cacheService.clearCache();
    return this.sectionsRepository.findOneBy({ id: ret.identifiers[0].id });
  }

  public async updateSection(dto: SectionDTO): Promise<SectionDTO> {
    if (!dto.id) {
      throw new NotFoundException('Раздел не найден');
    }
    const section = new SectionEntity();
    Object.assign(section, dto);
    const errors = await validate(section);
    if (errors.length > 0) {
      const errorsList: string[] = [];
      errors.forEach((err: ValidationError) => {
        errorsList.push(...Object.values(err.constraints));
      });
      throw new BadRequestException(
        new BadRequestDTO('Есть ошибки валидации', errorsList),
      );
    }
    const ret = await this.sectionsRepository.update(section.id, section);
    if (ret.affected === 0) {
      throw new NotFoundException('Раздел не найден');
    }
    this.cacheService.clearCache();
    return this.sectionsRepository.findOneBy({ id: section.id });
  }

  public async removeSection(id: number): Promise<Record<string, never>> {
    const ret = await this.sectionsRepository.delete({ id });
    if (ret.affected === 0) {
      throw new NotFoundException('Раздел не найден');
    }
    this.cacheService.clearCache();
    // Удалить методы в разделе
    await this.methodsRepository.delete({ sectionId: id });
    return {};
  }

  public async orderSections(
    order: Record<string, number>,
  ): Promise<Record<string, never>> {
    for (const [key, value] of Object.entries(order)) {
      await this.sectionsRepository.update(key, { order: value });
    }
    return {};
  }

  public async getMethods(sectionId?: number): Promise<MethodDTO[]> {
    const repository = this.methodsRepository
      .createQueryBuilder('m')
      .orderBy('m.order');
    if (sectionId) {
      return repository.where('m.sectionId = :id', { id: sectionId }).getMany();
    }
    return repository.where('m.sectionId is null').getMany();
  }

  public async addMethod(dto: MethodFieldsDTO): Promise<MethodDTO> {
    const method = new MethodEntity();
    delete (dto as any).id;
    if (dto.request) {
      dto.request = dto.request.toUpperCase();
    }
    Object.assign(method, dto);
    const errors = await validate(method);
    if (errors.length > 0) {
      const errorsList: string[] = [];
      errors.forEach((err: ValidationError) => {
        errorsList.push(...Object.values(err.constraints));
      });
      throw new BadRequestException(
        new BadRequestDTO('Есть ошибки валидации', errorsList),
      );
    }
    const ret = await this.methodsRepository.insert(method);
    this.cacheService.clearCache();
    return this.methodsRepository.findOneBy({ id: ret.identifiers[0].id });
  }

  public async updateMethod(dto: MethodDTO): Promise<MethodDTO> {
    if (!dto.id) {
      throw new NotFoundException('Метод не найден');
    }
    const method = new MethodEntity();
    Object.assign(method, dto);
    const errors = await validate(method);
    if (errors.length > 0) {
      const errorsList: string[] = [];
      errors.forEach((err: ValidationError) => {
        errorsList.push(...Object.values(err.constraints));
      });
      throw new BadRequestException(
        new BadRequestDTO('Есть ошибки валидации', errorsList),
      );
    }
    const ret = await this.methodsRepository.update(method.id, method);
    if (ret.affected === 0) {
      throw new NotFoundException('Метод не найден');
    }
    this.cacheService.clearCache();
    return this.methodsRepository.findOneBy({ id: method.id });
  }

  public async removeMethod(id: number): Promise<Record<string, never>> {
    const ret = await this.methodsRepository.delete({ id });
    if (ret.affected === 0) {
      throw new NotFoundException('Метод не найден');
    }
    this.cacheService.clearCache();
    return {};
  }

  public async orderMethods(
    order: Record<string, number>,
  ): Promise<Record<string, never>> {
    for (const [key, value] of Object.entries(order)) {
      await this.methodsRepository.update(key, { order: value });
    }
    return {};
  }
}
