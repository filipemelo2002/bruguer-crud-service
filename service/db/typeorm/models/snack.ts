import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SnackIngredientModel } from "./snack-ingredient";

@Entity("snack")
export class SnackModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: 'text'
  })
  name: string;

  @OneToMany(() => SnackIngredientModel, (snackIngredient) => snackIngredient.snack)
  ingredients: SnackIngredientModel[];
}