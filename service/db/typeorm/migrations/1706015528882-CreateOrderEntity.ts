import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderEntity1706015528882 implements MigrationInterface {
    name = 'CreateOrderEntity1706015528882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderitem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" numeric NOT NULL, "notes" text, "snackId" uuid, "orderId" uuid, CONSTRAINT "PK_b7f87d0e20dee3122eb2810d7ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orderitem" ADD CONSTRAINT "FK_4f9d5d5859cc5ff792d38e84fde" FOREIGN KEY ("snackId") REFERENCES "snacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderitem" ADD CONSTRAINT "FK_a15ebbc0e6cb61cf91be01a0028" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderitem" DROP CONSTRAINT "FK_a15ebbc0e6cb61cf91be01a0028"`);
        await queryRunner.query(`ALTER TABLE "orderitem" DROP CONSTRAINT "FK_4f9d5d5859cc5ff792d38e84fde"`);
        await queryRunner.query(`DROP TABLE "orderitem"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
