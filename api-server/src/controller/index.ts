import { Response, Request } from "express";
import Car from "../model/car";
import Option from "../model/option";

class Controller {
  root(req: Request, res: Response) {
    res.json({ message: "Welcome to API server" });
  }

  addCar(req: Request, res: Response) {
    if (Car.find(req.body.number)) {
      res.json({ error: "Duplicated car" });
    } else {
      let car: Car = new Car(req.body.number, req.body.options, req.body.type);
      Car.add(car);
      res.json({ message: "Success" });
    }
  }

  findCar(req: Request, res: Response) {
    let car = Car.find(req.params.number);
    if (car) {
      let message = { ...car, totalFee: car.getTotalFee() };
      res.json({ message: message });
    } else {
      res.json({ error: "Car not found" });
    }
  }

  takeBill(req: Request, res: Response) {
    let car = Car.find(req.params.number);
    if (car) {
      car.setOut();
      res.json({ message: "success" });
    } else {
      res.json({ error: "Car not found" });
    }
  }

  editFees(req: Request, res: Response) {
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

  listToday(req: Request, res: Response) {
    //todo
  }

  listThisMonth(req: Request, res: Response) {
    //todo
  }

  listThisYear(req: Request, res: Response) {
    //todo
  }
}

export default Controller;
