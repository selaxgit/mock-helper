import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'db/mock-helper.sqlite',
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'file',
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity{.ts,.js}'],
  migrations: ['migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts'],
  migrationsTableName: 'migration_table',
});
