import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { globalContainer } from '@inversify/inversify.config';
import { AppDataSource } from "@db/typeorm/datasource";
import { Order } from "@entities/order";
import { OrderService } from "../services/order-service";
import { OrderItem, OrderItemProps } from "@entities/order-item";

interface CreateOrderItemsRequest {
  snackId: string;
  quantity: number;
  notes?: string;
}
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {

  try {
    await AppDataSource.initialize();
    const ordersService = globalContainer.get<OrderService>(OrderService);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'missing body' })
      }
    }

    const order = JSON.parse(event.body);
    await ordersService.create(new Order({
      items: order.items.map((item: CreateOrderItemsRequest) => {
        return new OrderItem({
          snackId: item.snackId,
          quantity: item.quantity,
          notes: item.notes
        } as OrderItemProps); 
      }),
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
