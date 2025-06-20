import { ApiProperty } from '@nestjs/swagger';

export class MethodFieldsDTO {
  @ApiProperty({ example: 'null' })
  sectionId: number | null;

  @ApiProperty({ example: 'POST' })
  request: string;

  @ApiProperty({ example: '200' })
  status: number;

  @ApiProperty({ example: 'login' })
  method: string;

  @ApiProperty({ example: 'for authorization' })
  name: string;

  @ApiProperty({ example: '{"status": "", "login": "admin"}' })
  response: string;
}

export class MethodDTO extends MethodFieldsDTO {
  @ApiProperty({ example: '1' })
  id: number;
}
