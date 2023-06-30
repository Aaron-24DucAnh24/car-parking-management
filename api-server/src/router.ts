import { Express } from "express"
import Controller from "./controller";

class Router {

	#controller: Controller

	constructor() {
		this.#controller = new Controller()
	}

	routing(app: Express) {
		app.get('/', this.#controller.root)
	}

}

export default Router