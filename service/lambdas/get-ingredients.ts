import { globalContainer } from '@inversify/inversify.config';
import { APIGatewayProxyResult } from 'aws-lambda';
import { IngredientService } from '../services/ingredient-service';
import AppDataSource from "@db/typeorm/datasource";
import { IngredientsViewModel } from '@view-model/ingredients-view-model';

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();
    const ingredientsService = globalContainer.get<IngredientService>(IngredientService);
    const { ingredients } = await ingredientsService.list();
    return {
      statusCode: 200,
      body: JSON.stringify({ ingredients: ingredients.map(IngredientsViewModel.toHTTP) }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  } finally {
    await AppDataSource.destroy();
  }
};

