import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import * as path from 'path';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.service';

const API_PREFIX = 'api';
const MOCK_PREFIX = 'mock';
const SWAGGER_URL = `${API_PREFIX}/swagger`;

async function bootstrap() {
  const logger = new Logger('main');
  const pathToPublic = join(__dirname, '..', 'public');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(),
  });
  app.enableCors({ methods: ['GET', 'POST'] });
  app.useStaticAssets(path.resolve('./public'));
  app.use(
    (request: Request, response: Response, next: express.NextFunction) => {
      if (
        !request.path.startsWith(API_PREFIX) &&
        !request.path.startsWith(MOCK_PREFIX) &&
        !!request.path.startsWith(SWAGGER_URL)
      ) {
        const pathToIndexFile = join(pathToPublic, '/index.html');
        if (existsSync(pathToIndexFile)) {
          return response.sendFile(pathToIndexFile);
        } else {
          return response.send('Not found').status(HttpStatus.OK);
        }
      }
      next();
    },
  );
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mock helper API swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  logger.log(`config:port: ${port}`);
  await app.listen(port);
}
bootstrap();
