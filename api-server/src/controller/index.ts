import { Response, Request } from "express";
import Car from "../model/car";
import Option from "../model/option";

class Controller {
  root(req: Request, res: Response) {
    res.json({ message: "Welcome to API server" });
  }

  async addCar(req: Request, res: Response) {
    if (await Car.find(req.body.number)) {
      res.json({ error: "Duplicated car" });
    } else {
      let options: [Option] = req.body.options.map(
        (option: { name: string }) => new Option(option.name)
      );

      let car: Car = new Car(req.body.number, options, req.body.type);
      Car.add(car);

      res.json({ message: "Success" });
    }
  }

  async findCar(req: Request, res: Response) {
    let number: string = req.params.number;
    let car: Car | null = await Car.find(number);

    if (car) {
      let message = { ...car, totalFee: car.getTotalFee() };
      res.json({ message: message });
    } else {
      res.json({ error: "Car not found" });
    }
  }

  async takeBill(req: Request, res: Response) {
    let number: string = req.params.number
    let car: Car | null = await Car.find(number);

    if (car) {
      car.setOut();
      res.json({ message: "success" });
    } else {
      res.json({ error: "Car not found" });
    }
  }

  async editFees(req: Request, res: Response) {
    Option.updateFees(
      req.body.washing,
      req.body.oilChanging,
      req.body.wheelChecking
    );
    Car.updateBaseFees(
      req.body.fourSeater,
      req.body.sevenSeater,
      req.body.truck
    );
    res.json({ message: "success" });
  }

  async listToday(req: Request, res: Response) {
    //todo
  }

  async listThisMonth(req: Request, res: Response) {
    //todo
  }

  async listThisYear(req: Request, res: Response) {
    //todo
  }
}

export default Controller;
