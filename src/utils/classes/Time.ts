class Time {
  constructor(public value: number, public unit: string) {
    this.value = value ?? Math.abs(value) ?? 1;
    this.unit = unit ?? "ms";
  }
  #units = ["ns", "μs", "ms", "s", "mn", "h", "d", "w", "m", "y"];
  #factors = [1e-6, 1e-3, 1, 1e3, 6e4, 3.6e6, 2.16e8, 2.16e8 * 7, 2.16e8 * 30, 2.16e8 * 365];
  #timeFactors = [7.776e7, 6.48e6, 3.6e3 * 60, 3.6e3, 60, 1];
  #dateUnits = ["y", "m", "d", "h", "mn", "s"];

  convert(targetUnit?: string): this {
    // implement
    if (this.value <= 0 || this.unit === targetUnit) return this;
    // if (this.value < 1000 && this.value > 0) return this;

    const indexed = this.#units.indexOf(this.unit);
    const level = this.#factors[indexed];
    if (level === undefined) throw new Error("Unit not found");
    if (level !== 1) {
      for (let i = 0; i < this.#factors.length; i++) {
        this.#factors[i] /= level;
      }
    }
    if (targetUnit) {
      const targetIndex = this.#units.indexOf(targetUnit);
      const targetLevel = this.#factors[targetIndex];
      if (targetLevel === undefined) throw new Error("Target unit not found");
      this.value /= targetLevel;
      this.value = +this.value;
      this.unit = targetUnit;
      return this;
    }
    const holdSum: number = this.value;
    for (let i = 0; i < this.#factors.length; i++) {
      this.value /= this.#factors[i];
      if (this.value < 1000 && this.value > 0) {
        this.value = +this.value;
        this.unit = this.#units[i];
        return this;
      }
      this.value = holdSum;
    }
    return this;
  }

  read() {
    const val = this.value;
    const unit = this.unit;
    this.convert();
    const res = `${+this.value.toFixed(2)} ${this.unit}`;
    this.value = val;
    this.unit = unit;
    return res;
  }

  valueOf() {
    return this.value;
  }
}

export default Time;
