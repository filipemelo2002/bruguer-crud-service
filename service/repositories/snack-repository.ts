import { Snack } from "@entities/snack";


export abstract class SnacksRepository {
  abstract create(snack: Snack): Promise<void>;
  abstract list(): Promise<Snack[]>;
  // abstract findOne(id: string): Promise<Snack | null>;
  // abstract update(snack: Snack): Promise<void>;
  // abstract delete(id: string): Promise<void>;
}
