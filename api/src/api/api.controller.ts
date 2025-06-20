import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiService } from './api.service';
import {
  BadRequestDTO,
  MethodDTO,
  MethodFieldsDTO,
  OrderDTO,
  RemoveDTO,
  SectionDTO,
  SectionFieldsDTO,
} from './dto';

@ApiTags('api')
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('sections')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Данные получены успешно',
    isArray: true,
    type: () => SectionDTO,
  })
  @ApiOperation({
    summary: 'Возвращает список разделов',
  })
  public async getSections(): Promise<SectionDTO[]> {
    return this.apiService.getSections();
  }

  @Post('sections/add')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные сохранены успешно',
    isArray: false,
    type: () => SectionDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Проверьте переданные данные',
    isArray: false,
    type: () => BadRequestDTO,
  })
  @ApiOperation({
    summary: 'Создать новый раздел',
  })
  public async addSection(@Body() body: SectionFieldsDTO): Promise<SectionDTO> {
    return this.apiService.addSection(body);
  }

  @Post('sections/update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные сохранены успешно',
    isArray: false,
    type: () => SectionDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Проверьте переданные данные',
    isArray: false,
    type: () => BadRequestDTO,
  })
  @ApiOperation({
    summary: 'Обновить данные раздела',
  })
  public async updateSection(@Body() body: SectionDTO): Promise<SectionDTO> {
    return this.apiService.updateSection(body);
  }

  @Post('sections/remove')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные удалены успешно',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Раздел не найден',
  })
  @ApiOperation({
    summary: 'Удалить раздел',
  })
  public async removeSection(
    @Body() body: RemoveDTO,
  ): Promise<Record<string, never>> {
    return this.apiService.removeSection(body.id);
  }

  @Post('sections/order')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные отсортированы успешно',
  })
  @ApiOperation({
    summary: 'Сортировка разделов',
  })
  public async orderSections(
    @Body() body: OrderDTO,
  ): Promise<Record<string, never>> {
    return this.apiService.orderSections(body.orders);
  }

  @ApiQuery({ name: 'sectionId', required: false })
  @Get('methods')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Данные получены успешно',
    isArray: true,
    type: () => MethodDTO,
  })
  @ApiOperation({
    summary: 'Возвращает список методов',
  })
  public async getMethods(
    @Query('sectionId') sectionId?: number,
  ): Promise<MethodDTO[]> {
    return this.apiService.getMethods(sectionId);
  }

  @Post('methods/add')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные сохранены успешно',
    isArray: false,
    type: () => MethodDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Проверьте переданные данные',
    isArray: false,
    type: () => BadRequestDTO,
  })
  @ApiOperation({
    summary: 'Создать новый метод',
  })
  public async addMethod(@Body() body: MethodFieldsDTO): Promise<MethodDTO> {
    return this.apiService.addMethod(body);
  }

  @Post('methods/update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные сохранены успешно',
    isArray: false,
    type: () => MethodDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Проверьте переданные данные',
    isArray: false,
    type: () => BadRequestDTO,
  })
  @ApiOperation({
    summary: 'Обновить данные раздела',
  })
  public async updateMethod(@Body() body: MethodDTO): Promise<MethodDTO> {
    return this.apiService.updateMethod(body);
  }

  @Post('methods/remove')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные удалены успешно',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Метод не найден',
  })
  @ApiOperation({
    summary: 'Удалить метод',
  })
  public async removeMethod(
    @Body() body: RemoveDTO,
  ): Promise<Record<string, never>> {
    return this.apiService.removeMethod(body.id);
  }

  @Post('methods/order')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Данные отсортированы успешно',
  })
  @ApiOperation({
    summary: 'Сортировка методов',
  })
  public async orderMethods(
    @Body() body: OrderDTO,
  ): Promise<Record<string, never>> {
    return this.apiService.orderMethods(body.orders);
  }
}
