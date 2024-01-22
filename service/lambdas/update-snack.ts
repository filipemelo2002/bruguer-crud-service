
import { globalContainer } from '@inversify/inversify.config';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SnackService } from '../services/snack-service';
import { AppDataSource } from "@db/typeorm/datasource";
import { SnacksViewModel } from '@view-model/snacks-view-model';
import { LambdaResponse } from '../helpers/lambda-response';
import { SnackNotFound } from '@errors/snack-not-found';
import { Ingredient, IngredientProps } from '@entities/ingredient';
import { SnackIngredient, SnackIngredientProps } from '@entities/snack-ingredient';
import { Snack } from '@entities/snack';

interface UpdateIngredientsRequest {
  id: string;
  quantity: number;
  ingredientId: string;
}

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();
    const snacksService = globalContainer.get<SnackService>(SnackService);

    if (!event.body) {
      return LambdaResponse.makeError(400, 'missing request body')
    }

    const id = event.pathParameters?.id;
    const snackAux = JSON.parse(event.body)

    const {
      snack
    } = await snacksService.update(new Snack({
      name: snackAux.name,
      ingredients: snackAux.ingredients.map((ingredient: UpdateIngredientsRequest) => {
        return new SnackIngredient({
        quantity: ingredient.quantity,
        ingredient: new Ingredient({} as IngredientProps, ingredient.ingredientId)
        } as SnackIngredientProps, ingredient.id); 
      }),
      price: snackAux.price
    }, id));

    return LambdaResponse.makeResponse(200, { snack: SnacksViewModel.toHTTP(snack) })

  } catch (err) {
    console.log(err);

    if (err instanceof SnackNotFound) {
      return LambdaResponse.makeError(404, err.message);
    }

    return LambdaResponse.makeError(500, 'some error occurred')

  } finally {
    await AppDataSource.destroy();
  }
};

