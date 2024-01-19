import { Snack } from "@entities/snack";
import { SnacksRepository } from "@repositories/snack-repository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { SnackIngredientModel } from "../models/snack-ingredient";
import { SnackModel } from "../models/snack";
import { SnackIngredientsMapper } from "../mappers/snack-ingredients-mapper";
import { SnackMapper } from "../mappers/snack-mapper";
import { SnackNotFound } from "@errors/snack-not-found";

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

  async findOne(id: string): Promise<Snack | null> {
    const snackModel = await this.repository.createQueryBuilder('snacks')
    .leftJoinAndSelect('snacks.ingredients', 'snackIngredient')
    .leftJoinAndSelect('snackIngredient.ingredient', 'ingredient')
    .leftJoinAndSelect('snackIngredient.snack', 'snack')
    .where("snacks.id = :id", {id})
    .getOne();

    if(!snackModel) {
      return null;
    }

    return SnackMapper.toDomain(snackModel)
  }

  async update(snack: Snack): Promise<void> {
    const snackEntity = await this.repository.findOne({
      where: {
        id: snack.id
      }
    })
    const snackModel = await this.findOne(snack.id);
    
    if (!snackModel || !snackEntity) {
      throw new SnackNotFound();
    }

    const toDelete = snackModel.ingredients.filter(ingre => snack.ingredients.findIndex(({id}) => id === ingre.id) < 0);

    await this.repository.update({id: snack.id}, {
      name: snack.name,
    })


    if (snack.ingredients.length > 0) {
      const ingredients =  snack.ingredients.map(ingredient => {
        const snackIngredient =  SnackIngredientsMapper.toTypeORM(ingredient);
        snackIngredient.snack = snackEntity;
        return snackIngredient;
      });
      await this.snackIngredientRepository.save(ingredients);
    }
    
    if (toDelete.length > 0) {
      await this.snackIngredientRepository.delete(toDelete.map(({id}) => id));
    }
  }

  async delete(id: string): Promise<void> {
    await this.snackIngredientRepository.delete({
      snack: {
        id
      }
    });
    await this.repository.delete({id});
  }
}