import {
  IQueryRequest,
  IGenericUUID,
  IGenericRecord,
  IPagingResponse,
} from '.';

export interface IStore {
  name: string;
  primaryKey: string;
  defaultPageSize: number;
  create(data: IGenericRecord): IGenericRecord | Promise<IGenericRecord>
  update(id: IGenericUUID, data: IGenericRecord): IGenericRecord | undefined | Promise<IGenericRecord> | Promise<undefined>
  findOne(id: IGenericUUID, data: IGenericRecord): IGenericRecord | undefined | Promise<IGenericRecord> | Promise<undefined>
  deleteOne(id: IGenericUUID, data: IGenericRecord): boolean
  find(query: IQueryRequest): IPagingResponse<IGenericRecord> | Promise<IPagingResponse<IGenericRecord>>
}
