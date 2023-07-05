import Option from "./option";

class Car {
  public number: string;
  public options: Option[];
  public inTime: string;
  public outTime: string = "";
  public type: string;
  public baseFee: number;
  public static baseFees = { truck: 9, sevenSeater: 7, fourSeater: 5 };

  constructor(number: string, options: Option[], type: string, others?: any) {
    this.number = number;
    this.options = options;
    this.type = type;
    if (others === undefined) {
      this.inTime = new Date().toString();
      this.baseFee =
        type == "truck"
          ? Car.baseFees.truck
          : type == "sevenSeater"
          ? Car.baseFees.sevenSeater
          : Car.baseFees.fourSeater;
    } else {
      this.inTime = others.inTime;
      this.baseFee = others.baseFee;
    }
  }

  public getDayNo(): number {
    let nowTime: Date = new Date();
    let inTime: Date = new Date(this.inTime);
    return Math.floor((nowTime.getTime() - inTime.getTime()) / 864e5) + 1;
  }

  public getTotalFee(): number {
    let res: number = this.baseFee * this.getDayNo();
    for (let option of this.options) {
      res += option.fee;
    }
    return res;
  }

  public static updateBaseFees(
    fourSeater: number,
    sevenSeater: number,
    truck: number
  ): void {
    Car.baseFees.fourSeater = fourSeater;
    Car.baseFees.sevenSeater = sevenSeater;
    Car.baseFees.truck = truck;
  }
}

export default Car;
