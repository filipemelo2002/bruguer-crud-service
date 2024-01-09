import "reflect-metadata"
import { lambdaHandler as getIngredients } from './lambdas/get-ingredients';
import { lambdaHandler as createIngredient } from './lambdas/create-ingredient';

export {
  getIngredients,
  createIngredient
};
