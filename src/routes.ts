import { Express, Request, Response } from 'express';
import { getResourcesHandler } from './controller/resource.controller';

export default function (app: Express) {
  app.get('/api/info', (req: Request, res: Response) => res.send('<h2>Welcome to File Explorer Back End</h2>'));

  app.get('/api/resource', getResourcesHandler);

}
