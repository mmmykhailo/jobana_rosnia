export class Chance {
  private accumulatedChance: number;

  constructor() {
    this.accumulatedChance = 0;
  }

  getChance() {
    this.accumulatedChance += 0.001;

    return (
      Math.random() * (1 - this.accumulatedChance) + this.accumulatedChance
    );
  }

  do() {
    const chance = this.getChance();

    const result = chance > 0.89;

    if (result) this.accumulatedChance = 0;

    return result;
  }
}
