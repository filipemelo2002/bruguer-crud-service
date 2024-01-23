import { Order } from "@entities/order";
import { NotEnoughIngredients } from "@errors/not-enough-ingredients";
import { SnackNotFound } from "@errors/snack-not-found";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { OrderRepository } from "@repositories/order-repository";
import { SnacksRepository } from "@repositories/snack-repository";
import { inject, injectable } from "inversify";

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository) private repository: OrderRepository,
    @inject(IngredientsRepository) private ingredientRepository: IngredientsRepository,
    @inject(SnacksRepository) private snackRepository: SnacksRepository
    ) {
  
  }

  async create(order: Order) {
    

    for (const orderItem of order.items) {
      const snack = await this.snackRepository.findOne(orderItem.snackId);

      if (!snack) {
        throw new SnackNotFound();
      }

      for (const ingredient of snack.ingredients) {
        const ingredientTotal = ingredient.quantity * orderItem.quantity;
        if (ingredientTotal > ingredient.ingredient.quantity) {
          throw new NotEnoughIngredients();
        }
        const auxIngre = ingredient.ingredient;
        auxIngre.quantity -= ingredientTotal;
        await this.ingredientRepository.update(auxIngre);
      }
    }
    
    await this.repository.create(order);
  }

}