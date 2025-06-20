import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';

@Module({
  controllers: [MockController],
  providers: [MockService],
  imports: [ApiModule],
  exports: [],
})
export class MockModule {}
