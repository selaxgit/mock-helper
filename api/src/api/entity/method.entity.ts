import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum HttpMethodsEnum {
  Post = 'POST',
  Get = 'GET',
}

@Entity('methods')
export class MethodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { nullable: true })
  sectionId: number | null;

  @Column('integer', { nullable: true })
  order: number | null;

  @Column('varchar', { length: 5 })
  @IsNotEmpty({ message: 'Поле "Http-запрос" должно быть заполнено' })
  @IsEnum(HttpMethodsEnum, {
    message: 'Поле "Http-запрос" должно быть GET или POST',
  })
  request: string;

  @Column('integer')
  @IsNotEmpty({ message: 'Поле "Статус" должно быть заполнено' })
  status: number;

  @Column('varchar', { length: 50 })
  @IsNotEmpty({ message: 'Поле "Метод" должно быть заполнено' })
  @MaxLength(50, {
    message: 'Длина поля "Метод" не должна превышать 50 символов',
  })
  method: string;

  @Column('varchar', { length: 255 })
  @IsNotEmpty({ message: 'Поле "Наименование/описание" должно быть заполнено' })
  @MaxLength(255, {
    message:
      'Длина поля "Наименование/описание" не должна превышать 255 символов',
  })
  name: string;

  @Column('varchar', { length: 5000 })
  @IsNotEmpty({ message: 'Поле "Ответ" должно быть заполнено' })
  @MaxLength(5000, {
    message: 'Длина поля "Ответ" не должна превышать 5000 символов',
  })
  response: string;
}
