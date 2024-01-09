import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ingredients")
export class IngredientModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: 'text'
  })
  name: string;

  @Column("int")
  quantity: number;
}
