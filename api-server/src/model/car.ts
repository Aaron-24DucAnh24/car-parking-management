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

  constructor(number: string, options: [Option], type: string, others?: any) {
    this.number = number;
    this.options = options;
    this.type = type;
    if (others === undefined) {
      this.id = database.get("data") ? database.get("data").length : 1;
      this.inTime = new Date().toString();
      this.baseFee =
        type == "truck"
          ? Car.baseFees.truck
          : type == "7-seater"
          ? Car.baseFees.sevenSeater
          : Car.baseFees.fourSeater;
    } else {
      this.id = others.id;
      this.inTime = others.inTime;
      this.baseFee = others.baseFee;
    }
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

  public static async find(number: string): Promise<Car | null> {
    let objList = database.get("data").reverse();
    for (let obj of objList)
      if (obj.number === number && !obj.outTime) {
        let options = obj.options.map(
          (option: any) => new Option(option.name, option.fee)
        );
        let car: Car = new Car(obj.number, options, obj.type, {
          id: obj.id,
          inTime: obj.inTime,
          baseFee: obj.baseFee,
        });
        return car;
      }

    return null;
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
