import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SnackIngredientModel } from "./snack-ingredient";

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

  @OneToMany(() => SnackIngredientModel, (snackIngredient) => snackIngredient.ingredient)
  snackIngredients: SnackIngredientModel[];
}
