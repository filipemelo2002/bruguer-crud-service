import { Snack } from "@entities/snack";
import { SnacksRepository } from "@repositories/snack-repository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { SnackIngredientModel } from "../models/snack-ingredient";
import { SnackModel } from "../models/snack";
import { SnackIngredientsMapper } from "../mappers/snack-ingredients-mapper";
import { SnackMapper } from "../mappers/snack-mapper";

@injectable()
export class TypeORMSnacksRepository implements SnacksRepository {
  private repository: Repository<SnackModel>;
  private snackIngredientRepository: Repository<SnackIngredientModel>;

  constructor(@inject(DataSource) dataSource: DataSource) {
    this.repository = dataSource.getRepository<SnackModel>(SnackModel);
    this.snackIngredientRepository = dataSource.getRepository<SnackIngredientModel>(SnackIngredientModel);
  }

  async create(snack: Snack): Promise<void> {
    const snackModel = await this.repository.save({
      id: snack.id,
      name: snack.name
    });

    await this.snackIngredientRepository.save(
      snack.ingredients.map(ingredient => {
        const snackIngredient =  SnackIngredientsMapper.toTypeORM(ingredient);
        snackIngredient.snack = snackModel;
        return snackIngredient;
      })
    );
  }

  async list(): Promise<Snack[]> {
    const snackModels = await this.repository.createQueryBuilder('snacks')
    .leftJoinAndSelect('snacks.ingredients', 'snackIngredient')
    .leftJoinAndSelect('snackIngredient.ingredient', 'ingredient')
    .leftJoinAndSelect('snackIngredient.snack', 'snack')
    .getMany();
    return snackModels.map(SnackMapper.toDomain)
  }

}