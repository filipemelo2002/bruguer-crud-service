import { DataSource } from "typeorm";
import { IngredientModel } from "./models/ingredient";
import { SnackIngredientModel } from "./models/snack-ingredient";
import { SnackModel } from "./models/snack";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE || "burguer-app",
  host: process.env.HOST || "localhost",
  username: process.env.USERNAME || "sam-user",
  password: process.env.PASSWORD || "my-password",
  entities: [IngredientModel, SnackModel, SnackIngredientModel],
  migrations: [__dirname + "/migrations/**/*.{js,ts}"],
})
