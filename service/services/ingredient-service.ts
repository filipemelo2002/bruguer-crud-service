import { Ingredient, IngredientProps } from "@entities/ingredient";
import { IngredientNotFound } from "@errors/ingredient-not-found";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { inject, injectable } from "inversify";
import { Optional } from "../helpers/optional";

interface IngredientServiceListResponse {
  ingredients: Ingredient[];
}

interface IngredientsServiceUpdateRequest extends Optional<IngredientProps, 'name' | 'quantity'> {
  id: string;
}

interface IngredientsServiceFindOndeResponse {
  ingredient: Ingredient;
}
@injectable()
export class IngredientService {

  constructor(@inject(IngredientsRepository) private service: IngredientsRepository) {

  }

  async list(): Promise<IngredientServiceListResponse> {

    const ingredients = await this.service.list();
    return {
      ingredients
    }
  }

  async create(ingredient: Ingredient): Promise<void> {
    await this.service.create(ingredient);
  }


  async findOne(id: string): Promise<IngredientsServiceFindOndeResponse> {
    const ingredient = await this.service.findOne(id);

    if (!ingredient) {
      throw new IngredientNotFound();
    }

    return {
      ingredient
    }
  }

  async update(request: IngredientsServiceUpdateRequest): Promise<IngredientsServiceFindOndeResponse> {

    const { id, name, quantity } = request;

    const ingredient = await this.service.findOne(id);


    if (!ingredient) {
      throw new IngredientNotFound();
    }

    if (name) {
      ingredient.name = name;
    }

    if (quantity) {
      ingredient.quantity = quantity;
    }

    await this.service.update(ingredient);

    return {
      ingredient
    }
  }

  async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}
