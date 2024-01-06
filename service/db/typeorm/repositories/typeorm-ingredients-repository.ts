import { Ingredient } from "@entities/ingredient";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { IngredientsMapper } from "../mappers/ingredients-mapper";
import { IngredientModel } from "../models/ingredient";

@injectable()
export class TypeORMIngredientsRepository implements IngredientsRepository {
  private repository: Repository<IngredientModel>;

  constructor(@inject(DataSource) private service: DataSource) {
    this.repository = this.service.getRepository<IngredientModel>(IngredientModel);
  }

  async list(): Promise<Ingredient[]> {
    const ingredients = await this.repository.find();

    return ingredients.map(IngredientsMapper.toDomain)
  }

}
