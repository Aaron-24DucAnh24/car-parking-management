import editJsonFile from "edit-json-file";
import Car from "../model/car";
import Option from "../model/option";

class Service {
  private database: editJsonFile.JsonEditor;

  constructor() {
    this.database = editJsonFile(`${__dirname}/../../storage/storage.json`, {
      autosave: true,
    });
  }

  private objToCar(obj: any): Car {
    let options = obj.options.map(
      (option: any) => new Option(option.name, option.fee)
    );
    return new Car(obj.number, options, obj.type, {
      inTime: obj.inTime,
      baseFee: obj.baseFee,
    });
  }

  public async findCar(
    number: string
  ): Promise<{ car: Car; index: string } | null> {
    let objList = this.database.get("data");
    for (let index in objList)
      if (objList[index].number === number && !objList[index].outTime) {
        return { car: this.objToCar(objList[index]), index: index };
      }
    return null;
  }

  public async setCarOut(index: string): Promise<void> {
    let objList = this.database.get("data");
    objList[index].outTime = new Date().toString();
    this.database.set("data", objList);
  }

  public async addCar(
    number: string,
    options: [{ name: string }],
    type: string
  ): Promise<void> {
    let opts: Option[] = options.map(function (opt: { name: string }) {
      return new Option(opt.name);
    });
    let car: Car = new Car(number, opts, type);
    this.database.append("data", car);
  }

  public async getCurrentState() {
    let objList = this.database.get("data");
    let truckNo: number = 0;
    let sevenSeaterNo: number = 0;
    let fourSeaterNo: number = 0;

    for (let obj of objList) {
      if (!obj.outTime && obj.type === "truck") truckNo += 1;
      if (!obj.outTime && obj.type === "sevenSeater") sevenSeaterNo += 1;
      if (!obj.outTime && obj.type === "fourSeater") fourSeaterNo += 1;
    }

    return { truckNo, sevenSeaterNo, fourSeaterNo };
  }

  private getQueryCondition(type: string) {
    let today: Date = new Date();
    let condition: (dateString: string) => boolean;
    if (type === "day") {
      condition = (dateString) =>
        today.toDateString() === new Date(dateString).toDateString();
      return condition;
    }
    if (type === "month") {
      condition = (dateString) =>
        today.getMonth() === new Date(dateString).getMonth() &&
        today.getFullYear() === new Date(dateString).getFullYear();
      return condition;
    }
    condition = (dateString) =>
      today.getFullYear() === new Date(dateString).getFullYear();
    return condition;
  }

  public async getCarStatistic(type: string) {
    let objList = this.database.get("data");
    let condition = this.getQueryCondition(type);

    let [
      totalIn,
      totalOut,
      truckIn,
      truckOut,
      sevenIn,
      sevenOut,
      fourIn,
      fourOut,
    ]: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let obj of objList) {
      if (condition(obj.inTime)) {
        totalIn += 1;
        if (obj.type === "truck") truckIn += 1;
        if (obj.type === "sevenSeater") sevenIn += 1;
        if (obj.type === "fourSeater") fourIn += 1;
      }
      if (obj.outTime && condition(obj.outTime)) {
        totalOut += 1;
        if (obj.type === "truck") truckOut += 1;
        if (obj.type === "sevenSeater") sevenOut += 1;
        if (obj.type === "fourSeater") fourOut += 1;
      }
    }

    return {
      come: { totalIn, truckIn, sevenIn, fourIn },
      go: { totalOut, truckOut, sevenOut, fourOut },
    };
  }

  public getOptionStatistic(type: string) {
    // todo
  }
}

export default Service;
