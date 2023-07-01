class Option {
  public name: string;
  public fee: number;
  public static fees: { washing: 5; oilChanging: 10; wheelChecking: 10 };

  constructor(name: string) {
    this.name = name;
    this.fee =
      name == "washing"
        ? Option.fees.washing
        : name == "oilChanging"
        ? Option.fees.oilChanging
        : Option.fees.wheelChecking;
  }
}

export default Option