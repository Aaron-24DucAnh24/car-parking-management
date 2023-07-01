import { Response, Request } from "express";

class Controller {

  root(req: Request, res: Response) {
    res.json({ message: "Welcome to API server" });
  }

}

export default Controller;