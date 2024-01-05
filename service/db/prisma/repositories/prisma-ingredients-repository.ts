import { PrismaClient } from '@prisma/client';
import { Ingredient } from '@entities/ingredient';
import { IngredientMapper } from '../mappers/ingredient-mapper';

export class PrismaIngredientsRepository {

  constructor(private prisma: PrismaClient) {

  }

  async list(): Promise<Ingredient[]> {
    const rawIngredients = await this.prisma.ingredient.findMany();

    return rawIngredients.map(IngredientMapper.toDomain);
  }
}
