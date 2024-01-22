import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { globalContainer } from '@inversify/inversify.config';
import { SnackService } from '../services/snack-service';
import { AppDataSource } from "@db/typeorm/datasource";
import { Snack } from "@entities/snack";
import { SnackIngredient } from "@entities/snack-ingredient";
import { Ingredient, IngredientProps } from "@entities/ingredient";

interface CreateIngredientsRequest {
  quantity: number;
  ingredientId: string;
}
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {

  try {
    await AppDataSource.initialize();
    const snacksService = globalContainer.get<SnackService>(SnackService);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'missing body' })
      }
    }

    const snack = JSON.parse(event.body);
    console.log(snack)
    await snacksService.create(new Snack({
      name: snack.name,
      ingredients: snack.ingredients.map((ingredient: CreateIngredientsRequest) => {
        const igr = new Ingredient({} as IngredientProps , ingredient.ingredientId)
        return new SnackIngredient({
        ingredient: igr,
        quantity: ingredient.quantity,
        snackId: ''
        }); 
      }),
      price: snack.price
    }))

    return {
      statusCode: 201,
    }

  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened'
      })
    }
  } finally {
    await AppDataSource.destroy();
  }

}
