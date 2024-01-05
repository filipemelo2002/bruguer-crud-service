import { makeIngredient } from "@tests/factories/ingredient-factory";
import { InMemoryIngredientsRepository } from "@tests/mock/in-memory-ingredients-repository"
import { IngredientService } from "./ingredient-service";

describe('Ingredient Service', () => {
  const repository = new InMemoryIngredientsRepository();
  const service = new IngredientService(repository);

  beforeEach(() => {
    repository.ingredients = []
  })

  it('should list all ingredients', async () => {
    const ingredientsList = [makeIngredient({})]
    repository.ingredients = ingredientsList;
    const { ingredients } = await service.list();
    expect(ingredients).toEqual(ingredientsList);
  })
})
