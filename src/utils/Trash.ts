class Trash {
  public value: unknown | Record<string, unknown> | (string & {});
  public dressed: string | null = null;
  private isObject(): this is { value: Record<string, unknown> } {
    return (
      typeof this.value === "object" &&
      this.value !== null &&
      !Array.isArray(this.value)
    );
  }
  dress(): unknown {
    if (this.isObject()) {
      let arr: any[][] = Object.entries(this.value);
      arr = arr.map((entry) => {
        return entry.map((value) => {
          typeof value === "function" || (value && value.constructor === RegExp)
            ? (value = value.toString())
            : value;
          return value;
        });
      });
      this.value = Object.fromEntries(arr);
      return (this.dressed = JSON.stringify(this.value, null, 15));
    }
    return this.value;
  }
  valueOf() {
    return this.dress() || this.value;
  }
  pick(value: unknown) {
    this.value = value;
    return this;
  }
  get() {
    return this.value;
  }
}

// ⧹╲⎝⧹༼◕ ͜oﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞﱞ.◕ ༽⧸⎠╱⟋╱

export default Trash;
