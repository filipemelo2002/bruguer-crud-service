import { globalContainer } from '@inversify/inversify.config';
import { APIGatewayProxyResult } from 'aws-lambda';
import { IngredientService } from '../services/ingredient-service';


export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const ingredientsService = globalContainer.get<IngredientService>(IngredientService);
    const { ingredients } = await ingredientsService.list();
    return {
      statusCode: 200,
      body: JSON.stringify({ ingredients }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};

