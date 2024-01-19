import { SnackNotFound } from "@errors/snack-not-found";
import { makeSnack } from "@tests/factories/snack-factory";
import { SnackService } from "./snack-service";
import { InMemorySnacksRepository } from "@tests/mock/in-memory-snacks-repository";

describe('Snack Service', () => {
  const repository = new InMemorySnacksRepository();
  const service = new SnackService(repository);

  beforeEach(() => {
    repository.snacks = []
  })

  it('should list all snacks', async () => {
    const snacksList = [makeSnack({})]
    repository.snacks = snacksList;
    const { snacks } = await service.list();
    expect(snacks).toEqual(snacksList);
  })

  it('should create a snack', async () => {
    const snack = makeSnack({});

    await repository.create(snack);

    expect(repository.snacks).toContain(snack);
  })

  it('should throw error when fetching for snack', async () => {
    expect(
      () => service.findOne('whatever-non-existing-id')
    ).rejects.toThrow(SnackNotFound)
  })

  it('should throw error when updating snack', async () => {
    expect(() => service.update({
      id: 'whatever-non-existing-id',
      name: "X-Egg Duplo"
    })).rejects.toThrow(SnackNotFound);
  });

  it('should update snack', async () => {
    const auxSnack = makeSnack({});

    await service.create(auxSnack);


    const { snack } = await service.update({
      id: auxSnack.id,
      ingredients: [auxSnack.ingredients[0]]
    });


    expect(snack.ingredients.length).toEqual(1);
    expect(snack.ingredients[0]).toEqual(auxSnack.ingredients[0]);
  })

  it('should remove snack', async () => {
    const auxSnacks = [makeSnack({ id: 'id-1' }), makeSnack({ id: 'id-2' })];
    await service.create(auxSnacks[0]);
    await service.create(auxSnacks[1]);

    await service.delete('id-1');

    expect(repository.snacks).not.toContain(auxSnacks[0]);
  })
})
