import editJsonFile from "edit-json-file";
import Option from "./option";
import { json } from "stream/consumers";

const jsonDatabase: editJsonFile.JsonEditor = editJsonFile(
  `${__dirname}/database.json`,
  { autosave: true }
);

class Car {
  public id: number;
  public number: string;
  public options: [Option];
  public inTime: string;
  public outTime: string = "";
  public type: string;
  public baseFee: number;
  static baseFees = { truck: 9, sevenSeater: 7, fourSeater: 5 };

  constructor(number: string, options: [Option], type: string) {
    this.id = jsonDatabase.get("data") ? jsonDatabase.get("data").length : 1;
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

    jsonDatabase.append("data", this);
  }
}

export default Car;