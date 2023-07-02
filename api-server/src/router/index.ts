import { Express } from "express";
import Controller from "../controller";

class Router {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  routing(app: Express) {
    app.get("/", this.controller.root);
    app.post("/add-car", this.controller.addCar);
    app.get("/find-car", this.controller.findCar);
    app.get("/take-bill", this.controller.takeBill);
    app.post("/edit-fees", this.controller.editFees);
  }
}

export default Router;
