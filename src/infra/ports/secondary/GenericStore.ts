/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import { v4 as uuidv4 } from 'uuid';
import { BaseStore } from './BaseStore';
import {
  IGenericUUID,
  IGenericRecord,
  IStoreConfig,
  IStore,
} from '.';

import { IQueryRequest, IPagingResponse } from '../primary';

export class GenericStore extends BaseStore implements IStore {
  private store: Map<IGenericUUID, IGenericRecord>;
  public primaryKey: string;
  public name: string;
  public defaultPageSize: number;

  constructor(config: IStoreConfig) {
    super();
    const { name, primaryKey } = config;
    this.name = name;
    this.primaryKey = primaryKey || '_id';
    this.store = new Map();
    this.defaultPageSize = 30;
  }

  public create(data: IGenericRecord): IGenericRecord {
    const id = uuidv4();
    const record = { ...data };
    record[this.primaryKey] = id;
    this.store.set(id, record);
    return record;
  }

  public update(id: IGenericUUID, data: IGenericRecord): IGenericRecord | undefined {
    const record = this.store.get(id);
    if (!record) {
      return undefined;
    }
    const updated = { ...record, ...data };
    updated[this.primaryKey] = id;
    this.store.set(id, updated);
    return updated;
  }

  public find(query?: IQueryRequest): IPagingResponse<IGenericRecord> {
    const page = +(query?.page || 1);
    const pageIndex = page - 1;
    const size = +(query?.size || this.defaultPageSize);
    const total = this.store.size;
    const filters = query?.filters || {};
    const result = [];
    let cursorPosition = 0;
    for (const record of this.store.values()) {
      // do filtering
      result.push(record);
      cursorPosition += 1;
    }
    console.log(cursorPosition, filters);

    const startAt = (pageIndex * size);
    console.log(` startAt ${startAt} size ${size}`);
    return {
      page,
      size,
      total,
      result: result.splice(startAt, size),
    };
  }

  public findOne(id: IGenericUUID): IGenericRecord | undefined {
    return this.store.get(id);
  }

  public deleteOne(id: IGenericUUID): boolean {
    return this.store.delete(id);
  }
}
