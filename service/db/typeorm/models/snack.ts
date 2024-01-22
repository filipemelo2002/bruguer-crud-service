import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SnackIngredientModel } from "./snack-ingredient";

@Entity("snacks")
export class SnackModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: 'text'
  })
  name: string;

  @OneToMany(() => SnackIngredientModel, (snackIngredient) => snackIngredient.snack)
  ingredients: SnackIngredientModel[];

  @Column("decimal")
  price: number;
}