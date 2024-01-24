import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascade1706104178524 implements MigrationInterface {
    name = 'AddCascade1706104178524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderitem" DROP CONSTRAINT "FK_4f9d5d5859cc5ff792d38e84fde"`);
        await queryRunner.query(`ALTER TABLE "orderitem" ADD CONSTRAINT "FK_4f9d5d5859cc5ff792d38e84fde" FOREIGN KEY ("snackId") REFERENCES "snacks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderitem" DROP CONSTRAINT "FK_4f9d5d5859cc5ff792d38e84fde"`);
        await queryRunner.query(`ALTER TABLE "orderitem" ADD CONSTRAINT "FK_4f9d5d5859cc5ff792d38e84fde" FOREIGN KEY ("snackId") REFERENCES "snacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
