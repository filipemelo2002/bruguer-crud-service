import { Snack } from "@entities/snack";


export abstract class SnacksRepository {
  abstract list(): Promise<Snack[]>;
  abstract create(snack: Snack): Promise<void>;
  abstract findOne(id: string): Promise<Snack | null>;
  abstract update(snack: Snack): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
