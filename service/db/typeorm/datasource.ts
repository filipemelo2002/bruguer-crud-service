import { DataSource } from "typeorm";
import { IngredientModel } from "./models/ingredient";
import { SnackIngredientModel } from "./models/snack-ingredient";
import { SnackModel } from "./models/snack";
import { OrderItemModel } from "./models/order-item";
import { OrderModel } from "./models/order";

export const AppDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE || "burguer_app",
  host: process.env.HOST || "burguer-app-db.cbwqoqsgcdjv.us-west-2.rds.amazonaws.com",
  username: process.env.USERNAME || "postgre",
  password: process.env.PASSWORD || "27032002",
  entities: [IngredientModel, SnackModel, SnackIngredientModel, OrderItemModel, OrderModel],
  migrations: [__dirname + "/migrations/**/*.{js,ts}"],
  ssl: {
    rejectUnauthorized: false,
    requestCert: true
  }
})
