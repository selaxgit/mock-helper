import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MethodEntity, SectionEntity } from './entity';
import { CacheService } from './cache.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, CacheService],
  imports: [TypeOrmModule.forFeature([SectionEntity, MethodEntity])],
  exports: [CacheService],
})
export class ApiModule {}
