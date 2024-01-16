import { AppDataSource } from "@db/typeorm/datasource";
import { SnackNotFound } from "@errors/snack-not-found";
import { globalContainer } from "@inversify/inversify.config";
import { SnacksViewModel } from "@view-model/snacks-view-model";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { LambdaResponse } from "../helpers/lambda-response";
import { SnackService } from "../services/snack-service";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();

    const service = globalContainer.get<SnackService>(SnackService);

    const id = event.pathParameters?.id as string;

    const { snack } = await service.findOne(id);

    return LambdaResponse.makeResponse(200, {
      snack: SnacksViewModel.toHTTP(snack)
    })
  } catch (exception) {
    if (exception instanceof SnackNotFound) {
      return LambdaResponse.makeError(404, 'Snack Not found!')
    }

    return LambdaResponse.makeError(500, 'Internal server error')
  } finally {
    await AppDataSource.destroy();
  }
}
