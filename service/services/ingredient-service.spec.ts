import { IngredientNotFound } from "@errors/ingredient-not-found";
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

  it('should create a ingredient', async () => {
    const ingredient = makeIngredient({});

    await repository.create(ingredient);

    expect(repository.ingredients).toContain(ingredient);
  })

  it('should throw error when fetching for ingredient', async () => {
    expect(
      () => service.findOne('whatever-non-existing-id')
    ).rejects.toThrow(IngredientNotFound)
  })

  it('should throw error when updating ingredient', async () => {
    expect(() => service.update({
      id: 'whatever-non-existing-id',
      quantity: 100
    })).rejects.toThrow(IngredientNotFound);
  });

  it('should update ingredient', async () => {
    const auxIngredient = makeIngredient({});

    await service.create(auxIngredient);


    const { ingredient } = await service.update({
      id: auxIngredient.id,
      quantity: 1000
    });


    expect(ingredient.quantity).toEqual(1000)
  })

  it('should remove ingredient', async () => {
    const auxIngredients = [makeIngredient({ id: 'id-1' }), makeIngredient({ id: 'id-2' })];
    await service.create(auxIngredients[0]);
    await service.create(auxIngredients[1]);

    await service.delete('id-1');

    expect(repository.ingredients).not.toContain(auxIngredients[0]);
  })
})
