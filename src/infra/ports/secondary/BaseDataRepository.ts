import {
  IGenericRecord,
  IGenericUUID,
  IStore,
} from '.';
import { IPagingResponse } from '../primary';

export abstract class BaseDataRepository {
  abstract store: IStore;
  abstract createRecord(data: IGenericRecord): IGenericRecord;
  abstract updateRecord(id: IGenericUUID, data: IGenericRecord): IGenericRecord | undefined;
  abstract findRecord(): IPagingResponse<IGenericRecord>;
  abstract findOneRecord(id: IGenericUUID): IGenericRecord | undefined;
  abstract deleteOneRecord(id: IGenericUUID): boolean;
}
