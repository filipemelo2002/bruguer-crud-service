import { globalContainer } from '@inversify/inversify.config';
import { APIGatewayProxyResult } from 'aws-lambda';
import { OrderService } from '../services/order-service';
import { AppDataSource } from "@db/typeorm/datasource";
import { OrdersViewModel } from '@view-model/orders-view-model';

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    await AppDataSource.initialize();
    const ordersService = globalContainer.get<OrderService>(OrderService);
    const { orders } = await ordersService.list();
    return {
      statusCode: 200,
      body: JSON.stringify({ orders: orders.map(OrdersViewModel.toHTTP) }),
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

