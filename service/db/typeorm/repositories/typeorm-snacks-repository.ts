import { Snack } from "@entities/snack";
import { SnacksRepository } from "@repositories/snack-repository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { SnackIngredientModel } from "../models/snack-ingredient";
import { SnackModel } from "../models/snack";
import { IngredientsMapper } from "../mappers/ingredients-mapper";

@injectable()
export class TypeORMSnacksRepository implements SnacksRepository {
  private repository: Repository<SnackModel>;
  private snackIngredientRepository: Repository<SnackIngredientModel>;

  constructor(@inject(DataSource) private dataSource: DataSource) {
    this.repository = dataSource.getRepository<SnackModel>(SnackModel);
    this.snackIngredientRepository = dataSource.getRepository<SnackIngredientModel>(SnackIngredientModel);
  }

  async create(snack: Snack): Promise<void> {
    await this.repository.save({
      id: snack.id,
      name: snack.name
    });

    await this.snackIngredientRepository.save(
      snack.ingredients.map(IngredientsMapper.toTypeORM)
    );
  }

}