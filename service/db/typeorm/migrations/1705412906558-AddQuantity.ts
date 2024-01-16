import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuantity1705412906558 implements MigrationInterface {
    name = 'AddQuantity1705412906558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "snackingredient" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "snackingredient" DROP COLUMN "quantity"`);
    }

}
