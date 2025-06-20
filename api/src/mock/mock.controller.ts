import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MockService } from './mock.service';
import { Response } from 'express';

@ApiTags('mock')
@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get('*path')
  @ApiOperation({
    summary: 'Моки для GET-запросов',
  })
  public getRequest(
    @Param('path') path: string[],
    @Res() response: Response,
  ): void {
    this.mockService.handleRequest(path.join('/'), response, 'GET');
  }

  @Post('*path')
  @ApiOperation({
    summary: 'Моки для POST-запросов',
  })
  public postRequest(
    @Param('path') path: string[],
    @Res() response: Response,
  ): void {
    this.mockService.handleRequest(path.join('/'), response, 'POST');
  }
}
