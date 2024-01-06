import AppDataSource from "@db/typeorm/datasource";
import { TypeORMIngredientsRepository } from "@db/typeorm/repositories/typeorm-ingredients-repository";
import { IngredientsRepository } from "@repositories/ingredients-repository";
import { Container } from "inversify";
import { DataSource } from "typeorm";
import { IngredientService } from "../services/ingredient-service";


const globalContainer = new Container();


globalContainer.bind<DataSource>(DataSource).toConstantValue(AppDataSource)
globalContainer
  .bind<IngredientsRepository>(IngredientsRepository)
  .to(TypeORMIngredientsRepository)
globalContainer.bind<IngredientService>(IngredientService).toSelf();


export { globalContainer }
