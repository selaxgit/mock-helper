import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sections')
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { nullable: true })
  order: number | null;

  @Column('varchar', { length: 255 })
  @IsNotEmpty({ message: 'Поле "Наименование" должно быть заполнено' })
  @MaxLength(255, {
    message: 'Длина поля "Наименование" не должна превышать 255 символов',
  })
  name: string;

  @Column('varchar', { length: 50 })
  @IsNotEmpty({ message: 'Поле "УРЛ" должно быть заполнено' })
  @MaxLength(50, {
    message: 'Длина поля "УРЛ" не должна превышать 50 символов',
  })
  url: string;
}
