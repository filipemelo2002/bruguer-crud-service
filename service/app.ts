import "reflect-metadata"
import { lambdaHandler as getIngredients } from './lambdas/get-ingredients';
import { lambdaHandler as createIngredient } from './lambdas/create-ingredient';
import { lambdaHandler as updateIngredient } from './lambdas/update-ingredient';
import { lambdaHandler as getIngredient } from './lambdas/get-ingredient';
import { lambdaHandler as deleteIngredient } from './lambdas/delete-ingredient';

export {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredient
};
