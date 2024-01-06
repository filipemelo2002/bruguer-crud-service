import { DataSource } from "typeorm";
import { IngredientModel } from "./models/ingredient";


const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [IngredientModel]
})

export default AppDataSource;
