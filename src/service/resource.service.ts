import { Resource } from "../model/resource.model";
import { getRootLevelResources } from "../repository/sqlite";

export async function getRootResources(): Promise<Resource[]> {
  try {    
    return getRootLevelResources();
  
  } catch(err){
    throw Error('Failed to retrieve root files and folders');
  }
}