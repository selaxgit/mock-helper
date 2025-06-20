import { ApiProperty } from '@nestjs/swagger';

export class SectionFieldsDTO {
  @ApiProperty({ example: 'Для авторизации' })
  name: string;

  @ApiProperty({ example: 'auth' })
  url: string;
}

export class SectionDTO extends SectionFieldsDTO {
  @ApiProperty({ example: '1' })
  id: number;
}
