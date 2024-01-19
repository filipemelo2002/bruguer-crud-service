import { Ingredient } from "@entities/ingredient";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { IngredientsMapper } from "../mappers/ingredients-mapper";
import { IngredientModel } from "../models/ingredient";
import { SnackIngredientModel } from "../models/snack-ingredient";

@injectable()
export class TypeORMIngredientsRepository implements IngredientsRepository {
  private repository: Repository<IngredientModel>;
  private snackIngredientRepository: Repository<SnackIngredientModel>;

  constructor(@inject(DataSource) private service: DataSource) {
    this.repository = this.service.getRepository<IngredientModel>(IngredientModel);
    this.snackIngredientRepository = this.service.getRepository<SnackIngredientModel>(SnackIngredientModel);
  }

  async list(): Promise<Ingredient[]> {
    const ingredients = await this.repository.find();

    return ingredients.map(IngredientsMapper.toDomain)
  }

  async create(ingredient: Ingredient): Promise<void> {
    await this.repository.save({
      id: ingredient.id,
      name: ingredient.name,
      quantity: ingredient.quantity
    })
  }

  async findOne(id: string): Promise<Ingredient | null> {
    const ingredient = await this.repository.findOne({
      where: {
        id
      }
    })

    if (!ingredient) {
      return null;
    }
    return IngredientsMapper.toDomain(ingredient)
  }

  async update(ingredient: Ingredient): Promise<void> {
    await this.repository.update({ id: ingredient.id }, {
      quantity: ingredient.quantity,
      name: ingredient.name
    });
  }

  async delete(id: string): Promise<void> {
    await this.snackIngredientRepository.delete({
      snack: {
        id
      }
    });
    await this.repository.delete({ id });
  }
}
