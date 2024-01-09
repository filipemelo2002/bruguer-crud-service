import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { globalContainer } from '@inversify/inversify.config';
import { IngredientService } from '../services/ingredient-service';
import AppDataSource from "@db/typeorm/datasource";
import { Ingredient } from "@entities/ingredient";


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {

  try {
    await AppDataSource.initialize();
    const ingredientsService = globalContainer.get<IngredientService>(IngredientService);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'missing body' })
      }
    }

    const ingredient = JSON.parse(event.body);

    await ingredientsService.create(new Ingredient({
      name: ingredient.name,
      quantity: ingredient.quantity
    }));

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
