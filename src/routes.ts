import { Express, Request, Response } from 'express';

export default function (app: Express) {
  app.get('/', (req: Request, res: Response) => res.send('<h2>Express + TypeScript + Nodemon</h2>'));

  //TODO - add endpoints for file explorer Front End

}
