import { DataSource } from "typeorm";
import { IngredientModel } from "./models/ingredient";
import { SnackIngredientModel } from "./models/snack-ingredient";
import { SnackModel } from "./models/snack";

const AppDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  entities: [IngredientModel, SnackModel, SnackIngredientModel]
})

export default AppDataSource;
