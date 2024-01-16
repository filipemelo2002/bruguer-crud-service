import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupDbEntities1705351348987 implements MigrationInterface {
    name = 'SetupDbEntities1705351348987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "snacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_7ae77e4dcf87277e4dd0c717c04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "snackingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "snackId" uuid, "ingredientId" uuid, CONSTRAINT "PK_2438b8944ca6071f601c6cc8e92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "snackingredient" ADD CONSTRAINT "FK_889d610354efe4c14f1717b22cb" FOREIGN KEY ("snackId") REFERENCES "snacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "snackingredient" ADD CONSTRAINT "FK_5936ce7cdc35d2c33e450ceea8a" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "snackingredient" DROP CONSTRAINT "FK_5936ce7cdc35d2c33e450ceea8a"`);
        await queryRunner.query(`ALTER TABLE "snackingredient" DROP CONSTRAINT "FK_889d610354efe4c14f1717b22cb"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "snackingredient"`);
        await queryRunner.query(`DROP TABLE "snacks"`);
    }

}
