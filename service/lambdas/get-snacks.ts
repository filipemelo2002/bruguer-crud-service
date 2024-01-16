import { globalContainer } from '@inversify/inversify.config';
import { APIGatewayProxyResult } from 'aws-lambda';
import { SnackService } from '../services/snack-service';
import { AppDataSource } from "@db/typeorm/datasource";
import { SnacksViewModel } from '@view-model/snacks-view-model';

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();
    const snackssService = globalContainer.get<SnackService>(SnackService);
    const { snacks } = await snackssService.list();
    return {
      statusCode: 200,
      body: JSON.stringify({ snacks: snacks.map(SnacksViewModel.toHTTP) }),
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

