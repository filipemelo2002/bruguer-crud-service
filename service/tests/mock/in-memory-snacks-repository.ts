import { Snack } from "@entities/snack";
import { SnacksRepository } from "@repositories/snack-repository";

export class InMemorySnacksRepository implements SnacksRepository {
  public snacks: Snack[] = [];

  public async list(): Promise<Snack[]> {
    return this.snacks;
  }

  public async create(snack: Snack) {
    this.snacks.push(snack);
  }

  public async findOne(id: string) {
    return this.snacks.find(snack => snack.id === id) || null
  }

  public async update(request: Snack): Promise<void> {
    const snackIndex = this.snacks.findIndex(snack => snack.id === request.id);
    this.snacks[snackIndex] = request
  }

  public async delete(id: string) {
    const index = this.snacks.findIndex(snack => snack.id === id);

    if (index < 0) {
      return;
    }

    this.snacks.splice(index, 1);

  }
}

