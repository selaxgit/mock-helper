export interface IAppConfig {
  port: number;
  jwtSecret: string;
  db: {
    type: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
}
