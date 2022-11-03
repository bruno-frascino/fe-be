import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { Resource } from '../model/resource.model';
import { getRootResources } from '../service/resource.service';

export async function getResourcesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const fileSystem: Resource[] = await getRootResources();
    res.send(fileSystem);
  
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
