export interface Resource {
  id: number;
  name: string;
  content?: string;
  type: ResourceType;
  parentId: number;
}

export function isResource(object: any) {
  return !!(
    object.name &&
    isValidType(object.type) &&
    isValidFile(object)
     );
}

export function isValidType(type: any) {
  return !!(type && (type === ResourceType.FILE || type === ResourceType.FOLDER));
}

function isValidFile(object: any) {
  if (object.type === ResourceType.FILE) {
    return !!(
      object.hasOwnProperty('content') && 
      object.content
    );
  }
  return object.hasOwnProperty('content') === false;
}

export enum ResourceType {
  FILE = 'file',
  FOLDER = 'folder'
}