import { ApiProperty } from '@nestjs/swagger';

export class RemoveDTO {
  @ApiProperty({ example: '1' })
  id: number;
}
