export class SnackNotFound extends Error{
  constructor() {
    super("Snack not found!");
  }
}