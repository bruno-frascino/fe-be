import { Resource } from "../model/resource.model";
import { AddResponse } from "../model/utils.model";
import { addResourceData, getResourcesDataByName, getRootLevelResources } from "../repository/sqlite";

export async function getRootResources(): Promise<Resource[]> {
  try {    
    return getRootLevelResources();
  
  } catch(err){
    throw Error('Failed to retrieve root files and folders');
  }
}

export async function getResourcesByName(keyword: string): Promise<Resource[]> {
  try {    
    return getResourcesDataByName(keyword);
  
  } catch(err){
    throw Error('Failed to retrieve files and folders');
  }
}

export async function addResource(resource: Resource): Promise<AddResponse> {
  try {    
    return addResourceData(resource);
  
  } catch(err){
    throw Error(`Failed to add the resource ${JSON.stringify(resource)}`);
  }
}