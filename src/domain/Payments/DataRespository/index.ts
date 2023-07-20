/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import {
  BaseDataRepository,
  IGenericRecord,
  IPagingResponse,
  IGenericUUID,
  IStore,
} from '../../../infra/ports/secondary';

export class PaymentsDataRepository extends BaseDataRepository {
  public store: IStore;

  constructor(store: IStore) {
    super();
    this.store = store;
  }

  public createRecord(data: IGenericRecord): IGenericRecord {
    console.log(data);
    throw new Error('Not implemented - create');
  }

  public updateRecord(id: unknown, data: IGenericRecord): IGenericRecord | undefined {
    console.log(id, data);
    throw new Error('Not implemented - update');
  }

  public findRecord(): IPagingResponse<IGenericRecord> {
    throw new Error('Not implemented - find');
  }

  public findOneRecord(id: IGenericUUID): IGenericRecord | undefined {
    console.log(id);
    throw new Error('Not implemented - findOne');
  }

  public deleteOneRecord(id: IGenericUUID): boolean {
    console.log(id);
    throw new Error('Not implemented - deleteOne');
  }
}
