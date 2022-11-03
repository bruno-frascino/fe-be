import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { isResource, Resource } from '../model/resource.model';
import { AddResponse } from '../model/utils.model';
import { addResource, getRootResources } from '../service/resource.service';

export async function getResourcesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const rootResources: Resource[] = await getRootResources();
    res.send(rootResources);
  
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export async function addResourceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const resourceBody = req.body;

    if (!isResource(resourceBody)) {
      const errorMessage = `Invalid resource payload ${JSON.stringify(resourceBody)}`;
      logger.error(errorMessage);
      res.status(400).send(errorMessage);
    } else {
      const responseData:AddResponse  = await addResource(resourceBody);
      res.send(responseData);
    }    
  } catch (err) {
    logger.error(err);
    next(err);
  }
}
