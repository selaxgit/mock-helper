import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDTO {
  @ApiProperty({ example: 'Ошибки валидации' })
  message: string;

  @ApiProperty({
    example:
      '["Поле должно name быть заполнено", "Длина поля не должна превышать 255 символов"]',
  })
  errors: string[];

  constructor(message: string, errors: string[]) {
    this.message = message;
    this.errors = errors;
  }
}
