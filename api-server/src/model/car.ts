import database from "./config";
import Option from "./option";

class Car {
  public id: number;
  public number: string;
  public options: [Option];
  public inTime: string;
  public outTime: string = "";
  public type: string;
  public baseFee: number;
  public static baseFees = { truck: 9, sevenSeater: 7, fourSeater: 5 };

  constructor(number: string, options: [Option], type: string) {
    this.id = database.get("data") ? database.get("data").length : 1;
    this.number = number;
    this.options = options;
    this.type = type;
    this.inTime = new Date().toString();
    this.baseFee =
      type == "truck"
        ? Car.baseFees.truck
        : type == "7-seater"
        ? Car.baseFees.sevenSeater
        : Car.baseFees.fourSeater;
  }

  public getTotalFee(): number {
    let res = this.baseFee;
    for (let option of this.options) {
      res += option.fee;
    }
    return res;
  }

  public setOut(): void {
    this.outTime = new Date().toString();
  }

  public static add(car: Car): void {
    database.append("data", car);
  }

  public static find(number: string): Car | null {
    //todo
    return null;
  }

  public static updateBaseFees(
    fourSeater: number,
    sevenSeater: number,
    truck: number
  ): void {
    Car.baseFees.fourSeater = fourSeater
    Car.baseFees.sevenSeater = sevenSeater
    Car.baseFees.truck = truck
  }
}

let option: Option = new Option('washing')
let car: Car = new Car('123', [option], 'truck')
Car.add(car)

export default Car;
