import { IAppConfig } from './interfaces';

export const config = (): IAppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'jwt-secret-contant',
  db: {
    type: process.env.ORM_DB_TYPE || 'sqlite',
    database: process.env.ORM_DB_DATABASE || 'db/mock-helper.sqlite',
    synchronize: false,
    logging: false,
  },
});
