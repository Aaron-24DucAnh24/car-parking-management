import { Response, Request } from "express";
import Service from "../service";
import Car from "../model/car";
import Option from "../model/option";

class Controller {
  private service: Service;

  constructor() {
    this.service = new Service();
  }

  root(req: Request, res: Response) {
    res.json({ message: "Welcome to API server" });
  }

  async addCar(req: Request, res: Response) {
    if (await this.service.findCar(req.body.number)) {
      res.json({ error: "Duplicated car" });
    } else {
      await this.service.addCar(
        req.body.number,
        req.body.options,
        req.body.type
      );
      res.json({ message: "Success" });
    }
  }

  async findCar(req: Request, res: Response) {
    let number: string = req.params.number;
    let obj = await this.service.findCar(number);

    if (obj) {
      let message = {
        ...obj.car,
        totalFee: obj.car.getTotalFee(),
        dayNumber: obj.car.getDayNo(),
      };
      res.json({ message: message });
    } else {
      res.json({ error: "Car not found" });
    }
  }

  async takeBill(req: Request, res: Response) {
    let number: string = req.params.number;
    let obj = await this.service.findCar(number);

    if (obj) {
      res.json({ message: "Success" });
    } else {
      res.json({ error: "Car not found" });
    }
  }

  async getFees(req: Request, res: Response) {
    res.json({message: {
      truck: Car.baseFees.truck,
      sevenSeater: Car.baseFees.sevenSeater,
      fourSeater: Car.baseFees.fourSeater,
      washing: Option.fees.washing,
      wheelChecking: Option.fees.wheelChecking,
      oilChanging: Option.fees.oilChanging
    }})
  }

  editFees(req: Request, res: Response) {
    Car.updateBaseFees(
      req.body.fourSeater,
      req.body.sevenSeater,
      req.body.truck
    );
    Option.updateFees(
      req.body.washing,
      req.body.oilChanging,
      req.body.wheelChecking
    );
    res.json({ message: "success" });
  }

  async getCurrentState(req: Request, res: Response) {
    res.json({ message: await this.service.getCurrentState() });
  }

  async listToday(req: Request, res: Response) {
    res.json({ message: await this.service.getStatistic("day") });
  }

  async listThisMonth(req: Request, res: Response) {
    res.json({ message: await this.service.getStatistic("month") });
  }

  async listThisYear(req: Request, res: Response) {
    res.json({ message: await this.service.getStatistic("year") });
  }

  handleInvalidPath(req: Request, res: Response) {
    res.json({ error: "No available path" });
  }
}

export default Controller;
