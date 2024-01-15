
import { globalContainer } from '@inversify/inversify.config';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IngredientService } from '../services/ingredient-service';
import AppDataSource from "@db/typeorm/datasource";
import { IngredientsViewModel } from '@view-model/ingredients-view-model';
import { LambdaResponse } from '../helpers/lambda-response';
import { IngredientNotFound } from '@errors/ingredient-not-found';

export const lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();
    const ingredientsService = globalContainer.get<IngredientService>(IngredientService);

    if (!event.body) {
      return LambdaResponse.makeError(400, 'missing request body')
    }

    const id = event.pathParameters?.id;
    const auxIngredient = JSON.parse(event.body)

    const {
      ingredient
    } = await ingredientsService.update({ ...auxIngredient, id });

    return LambdaResponse.makeResponse(200, { ingredient: IngredientsViewModel.toHTTP(ingredient) })

  } catch (err) {
    console.log(err);

    if (err instanceof IngredientNotFound) {
      return LambdaResponse.makeError(404, err.message);
    }

    return LambdaResponse.makeError(500, 'some error occurred')

  } finally {
    await AppDataSource.destroy();
  }
};

