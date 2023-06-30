import Controller from "../controller/index.js";

class Router {

	#controller

	constructor() {
		this.#controller = new Controller()
	}

	routing(app) {
		app.get('/', this.#controller.root)
	}

}

export default Router