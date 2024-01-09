import { DataSource } from "typeorm";
import { IngredientModel } from "./models/ingredient";

const AppDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  entities: [IngredientModel]
})

export default AppDataSource;
