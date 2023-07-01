import editJsonFile from "edit-json-file";
import Option from "./option";

const jsonDatabase: editJsonFile.JsonEditor = editJsonFile(
  `${__dirname}/database.json`,
  { autosave: true }
);

class Car {
  public number: string;
  public options: [Option];
  public inTime: string;
  public outTime: string = "";
  public type: string;
  public baseFee: number;
  public static baseFees = { truck: 9, sevenSeater: 7, fourSeater: 5 };

  constructor(number: string, options: [Option], type: string) {
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

export default Car