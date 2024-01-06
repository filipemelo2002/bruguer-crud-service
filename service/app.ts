import "reflect-metadata"
import AppDataSource from "@db/typeorm/datasource";
import { lambdaHandler as getIngredients } from './lambdas/get-ingredients';

AppDataSource.initialize();
export {
  getIngredients
};
