export enum HttpMethodsEnum {
  Post = 'POST',
  Get = 'GET',
}

export interface ISection {
  id: number;
  name: string;
  url: string;
}

export interface IMethod {
  id: number;
  sectionId: number | null;
  request: HttpMethodsEnum;
  status: number;
  method: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}

export interface IOrder {
  [key: string]: number;
}
