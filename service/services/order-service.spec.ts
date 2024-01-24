import { OrderService } from "./order-service";
import { InMemoryOrdersRepository } from "@tests/mock/in-memory-orders-repository";
import { makeOrder } from "@tests/factories/order-factory";
import { InMemoryIngredientsRepository } from "@tests/mock/in-memory-ingredients-repository";
import { InMemorySnacksRepository } from "@tests/mock/in-memory-snacks-repository";
import { makeIngredient } from "@tests/factories/ingredient-factory";
import { makeSnack } from "@tests/factories/snack-factory";
import { makeSnackIngredient } from "@tests/factories/snack-ingredient-factory";
import { makeOrderItem } from "@tests/factories/order-item-factory";
import { SnackNotFound } from "@errors/snack-not-found";
import { NotEnoughIngredients } from "@errors/not-enough-ingredients";
import { Ingredient } from "@entities/ingredient";
import { SnackIngredient } from "@entities/snack-ingredient";
import { Snack } from "@entities/snack";

describe('Snack Service', () => {
  const repository = new InMemoryOrdersRepository();
  const ingredientsRepository = new InMemoryIngredientsRepository();
  const snackRepository = new InMemorySnacksRepository();
  const service = new OrderService(repository, ingredientsRepository, snackRepository);


  let ingredient: Ingredient;

  let snackIngredient: SnackIngredient;

  let snack: Snack;

  beforeEach(() => {
    ingredient = makeIngredient({
      quantity: 20
    });
    
    snackIngredient = makeSnackIngredient({
      ingredient,
      quantity: 5
    })

    snack = makeSnack({ingredients: [snackIngredient], price: 50.00});


    repository.orders = []
    ingredientsRepository.ingredients = [];
    snackRepository.snacks = [];
  })

  it('should create an order', async () => {
    ingredientsRepository.create(ingredient);
    snackRepository.create(snack);

    const order = makeOrder({
      items: [
        makeOrderItem({
          snackId: snack.id,
          quantity: 2
        })
      ]
    });

    await service.create(order);

    expect(repository.orders).toContain(order);
    expect(ingredient.quantity).toEqual(10)
  });

  it('should fail with SnackNotFound', async () => {
    snackRepository.snacks = [];
    const order = makeOrder({
      items: [
        makeOrderItem({
          snackId: snack.id,
          quantity: 2
        })
      ]
    });

    expect(() => service.create(order)).rejects.toThrow(SnackNotFound)
  });

  it('should fail with NotEnoughIngredients', async () => {
    
    ingredientsRepository.create(ingredient);
    snackIngredient.quantity = 1000;
    snackRepository.create(snack);

    const order = makeOrder({
      items: [
        makeOrderItem({
          snackId: snack.id,
          quantity: 2
        })
      ]
    });

    expect(() => service.create(order)).rejects.toThrow(NotEnoughIngredients)
  });

  it('should list all orders', async () => {
    ingredientsRepository.create(ingredient);
    snackRepository.create(snack);

    const order = makeOrder({
      items: [
        makeOrderItem({
          snackId: snack.id,
          quantity: 2
        })
      ]
    });

    await service.create(order);

    const {orders} = await service.list();

    expect(orders).toContain(order);
  })
})
