import {
  IGenericUUID, IGenericRecord, IStore, IQueryRequest, IPagingResponse,
} from '.';

export abstract class BaseStore implements IStore {
  abstract name: string;
  abstract primaryKey: string;
  abstract defaultPageSize: number;
  abstract create(data: IGenericRecord): IGenericRecord;
  abstract update(id: IGenericUUID, data: IGenericRecord): IGenericRecord | undefined;
  abstract find(query: IQueryRequest): IPagingResponse<IGenericRecord>;
  abstract findOne(id: IGenericUUID): IGenericRecord | undefined;
  abstract deleteOne(id: IGenericUUID): boolean;
}
