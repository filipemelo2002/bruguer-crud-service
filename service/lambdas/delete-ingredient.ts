import AppDataSource from "@db/typeorm/datasource";
import { IngredientNotFound } from "@errors/ingredient-not-found";
import { globalContainer } from "@inversify/inversify.config";
import { IngredientsViewModel } from "@view-model/ingredients-view-model";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { LambdaResponse } from "../helpers/lambda-response";
import { IngredientService } from "../services/ingredient-service";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();

    const service = globalContainer.get<IngredientService>(IngredientService);

    const id = event.pathParameters?.id as string;

    await service.delete(id);

    return LambdaResponse.makeResponse(200);
  } catch (exception) {
    if (exception instanceof IngredientNotFound) {
      return LambdaResponse.makeError(404, 'Ingredient Not found!')
    }

    return LambdaResponse.makeError(500, 'Internal server error')
  } finally {
    await AppDataSource.destroy();
  }
};
