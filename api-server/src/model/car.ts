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

  public getHourNumber(): number {
    let nowTime: Date = new Date();
    let inTime: Date = new Date(this.inTime);
    return Math.floor((nowTime.getTime() - inTime.getTime()) / 864e5) + 1;
  }

  public getTotalFee(): number {
    let res: number = this.baseFee * this.getHourNumber();
    for (let option of this.options) {
      res += option.fee;
    }
    return res;
  }

  public static async setOut(index: string): Promise<void> {
    let objList = database.get("data");
    objList[index].outTime = (new Date()).toString()
    database.set("data", objList)
  }

  public static add(car: Car): void {
    database.append("data", car);
  }

  public static async find(number: string): Promise<{car: Car, index: string} | null> {
    let objList = database.get("data");
    for (let index in objList)
      if (objList[index].number === number && !objList[index].outTime) {
        let options = objList[index].options.map(
          (option: any) => new Option(option.name, option.fee)
        );
        let car: Car = new Car(
          objList[index].number,
          options,
          objList[index].type,
          {
            id: objList[index].id,
            inTime: objList[index].inTime,
            baseFee: objList[index].baseFee,
          }
        );
        return {car, index};
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
