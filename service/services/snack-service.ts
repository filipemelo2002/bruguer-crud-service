import { Snack, SnackProps } from "@entities/snack";
import { SnackNotFound } from "@errors/snack-not-found";
import { SnacksRepository } from "@repositories/snack-repository";
import { inject, injectable } from "inversify";
import { Optional } from "../helpers/optional";

interface SnackServiceListResponse {
  snacks: Snack[];
}

interface SnacksServiceUpdateRequest extends Optional<SnackProps, 'name' | 'ingredients'> {
  id: string;
}

interface SnacksServiceFindOndeResponse {
  snack: Snack;
}
@injectable()
export class SnackService {

  constructor(@inject(SnacksRepository) private service: SnacksRepository) {

  }

  async list(): Promise<SnackServiceListResponse> {

    const snacks = await this.service.list();
    return {
      snacks
    }
  }

  async create(snack: Snack): Promise<void> {
    await this.service.create(snack);
  }


  async findOne(id: string): Promise<SnacksServiceFindOndeResponse> {
    const snack = await this.service.findOne(id);

    if (!snack) {
      throw new SnackNotFound();
    }

    return {
      snack
    }
  }

  async update(request: SnacksServiceUpdateRequest): Promise<SnacksServiceFindOndeResponse> {

    const { id, name, ingredients } = request;

    let snack = await this.service.findOne(id);


    if (!snack) {
      throw new SnackNotFound();
    }

    if (name) {
      snack.name = name;
    }

    if (ingredients) {
      snack.ingredients = ingredients;
    }
    
    await this.service.update(snack);
    snack = await this.service.findOne(id);

    if (!snack) {
      throw new SnackNotFound();
    }

    return {
      snack
    }
  }

  // async delete(id: string): Promise<void> {


  //   const snack = await this.service.findOne(id);

  //   if (!snack) {
  //     throw new SnackNotFound();
  //   }

  //   await this.service.delete(id);
  // }
}
