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
    app.put("/edit-fees", this.controller.editFees);
    app.get("/today", this.controller.listToday);
    app.get("/thisMonth", this.controller.listThisMonth);
    app.get("/thisYear", this.controller.listThisYear);
  }
}

export default Router;
