import jsonDatabase from "./config";

class Option {
  public name: string;
  public fee: number;
  static fees = { washing: 5, oilChanging: 10, wheelChecking: 10 };

  constructor(name: string) {
    this.name = name;
    this.fee =
      name == "washing"
        ? Option.fees.washing
        : name == "oilChanging"
        ? Option.fees.oilChanging
        : Option.fees.wheelChecking;
  }

  static updateFees(
    washing: number,
    oilChanging: number,
    wheelChecking: number
  ): void {
    Option.fees.washing = washing;
    Option.fees.oilChanging = oilChanging;
    Option.fees.wheelChecking = wheelChecking;
  }
}

export default Option;
