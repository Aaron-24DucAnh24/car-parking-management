import { Express } from "express";
import Controller from "../controller";

class Router {
  private controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  routing(app: Express) {
    app.get("/", this.controller.root);
    app.post("/add-car", this.controller.addCar.bind(this.controller));
    app.get("/find-car/:number", this.controller.findCar.bind(this.controller));
    app.get("/take-bill/:number", this.controller.takeBill.bind(this.controller));
    app.put("/edit-fees", this.controller.editFees);
    app.get("/current-state", this.controller.getCurrentState.bind(this.controller))
    app.get("/today", this.controller.listToday.bind(this.controller));
    app.get("/thisMonth", this.controller.listThisMonth.bind(this.controller));
    app.get("/thisYear", this.controller.listThisYear.bind(this.controller));
    app.use("/:any", this.controller.handleInvalidPath);
  }
}

export default Router;
