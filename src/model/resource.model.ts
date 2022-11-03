export interface Resource {
  id: number;
  name: string;
  content?: string;
  type: 'file' | 'folder';
  parentId: number;
}