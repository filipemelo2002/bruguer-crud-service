import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IngredientModel } from "./ingredient";
import { SnackModel } from "./snack";

@Entity("snackingredient")
export class SnackIngredientModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => SnackModel, (snack) => snack.ingredients, {cascade: true})
  snack: SnackModel;

  @ManyToOne(() => IngredientModel, (ingredient) => ingredient, {cascade: true})
  ingredient: IngredientModel;

  @Column("int")
  quantity: number;
}