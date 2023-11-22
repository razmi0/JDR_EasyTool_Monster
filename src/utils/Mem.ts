class Mem {
  value: number;
  unit: string;
  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }
  #units = ["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"];
  #factors = [1, 1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24];

  convert(targetUnit?: string): this {
    // implement
    if (this.value <= 0 || this.unit === targetUnit) return this;
    // if (this.value < 1000 && this.value > 0) return this;

    let indexed = this.#units.indexOf(this.unit);
    let level = this.#factors[indexed];
    if (level === undefined) throw new Error("Unit not found");
    if (level !== 1) {
      for (let i = 0; i < this.#factors.length; i++) {
        this.#factors[i] /= level;
      }
    }
    if (targetUnit) {
      let targetIndex = this.#units.indexOf(targetUnit);
      let targetLevel = this.#factors[targetIndex];
      if (targetLevel === undefined) throw new Error("Target unit not found");
      this.value /= targetLevel;
      this.value = +this.value;
      this.unit = targetUnit;
      return this;
    }
    let holdSum: number = this.value;
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
    const res = `${this.value} ${this.unit}`;
    this.value = val;
    this.unit = unit;
    return res;
  }

  valueOf() {
    return this.value;
  }
}

export default Mem;
