import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty()
  orders: Record<string, number>;
}
