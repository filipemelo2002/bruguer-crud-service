import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IngredientModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 50
  })
  name: string;

  @Column("number")
  quantity: number;
}
