import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1750362990609 implements MigrationInterface {
  name = 'SchemaUpdate1750362990609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "order" integer, "name" varchar(255) NOT NULL, "url" varchar(50) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "methods" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sectionId" integer, "order" integer, "request" varchar(5) NOT NULL, "status" integer NOT NULL, "method" varchar(50) NOT NULL, "name" varchar(255) NOT NULL, "response" varchar(5000) NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "methods"`);
    await queryRunner.query(`DROP TABLE "sections"`);
  }
}
