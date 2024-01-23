import { AppDataSource } from "@db/typeorm/datasource";
import { TypeORMIngredientsRepository } from "@db/typeorm/repositories/typeorm-ingredients-repository";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { Container } from "inversify";
import { DataSource } from "typeorm";
import { IngredientService } from "../services/ingredient-service";
import { SnacksRepository } from "@repositories/snack-repository";
import { TypeORMSnacksRepository } from "@db/typeorm/repositories/typeorm-snacks-repository";
import { SnackService } from "../services/snack-service";
import { OrderRepository } from "@repositories/order-repository";
import { TypeORMOrdersRepository } from "@db/typeorm/repositories/typeorm-orders-repository";
import { OrderService } from "../services/order-service";


const globalContainer = new Container();


globalContainer.bind<DataSource>(DataSource).toConstantValue(AppDataSource)
globalContainer
  .bind<IngredientsRepository>(IngredientsRepository)
  .to(TypeORMIngredientsRepository)
globalContainer.bind<IngredientService>(IngredientService).toSelf();
globalContainer
  .bind<SnacksRepository>(SnacksRepository)
  .to(TypeORMSnacksRepository);
globalContainer
  .bind<SnackService>(SnackService).toSelf();
globalContainer
  .bind<OrderRepository>(OrderRepository)
  .to(TypeORMOrdersRepository);
globalContainer
  .bind<OrderService>(OrderService).toSelf();

export { globalContainer }
