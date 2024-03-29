import "reflect-metadata"
import { lambdaHandler as getIngredients } from './lambdas/get-ingredients';
import { lambdaHandler as createIngredient } from './lambdas/create-ingredient';
import { lambdaHandler as updateIngredient } from './lambdas/update-ingredient';
import { lambdaHandler as getIngredient } from './lambdas/get-ingredient';
import { lambdaHandler as deleteIngredient } from './lambdas/delete-ingredient';
import { lambdaHandler as createSnack } from './lambdas/create-snack';
import { lambdaHandler as getSnacks } from './lambdas/get-snacks';
import { lambdaHandler as getSnack } from './lambdas/get-snack';
import { lambdaHandler as updateSnack } from './lambdas/update-snack';
import { lambdaHandler as deleteSnack } from './lambdas/delete-snack';
import { lambdaHandler as createOrder } from './lambdas/create-order';
import { lambdaHandler as getOrders } from './lambdas/get-orders';

export {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredient,
  createSnack,
  getSnacks,
  getSnack,
  updateSnack,
  deleteSnack,
  createOrder,
  getOrders
};
