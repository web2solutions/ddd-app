/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { IDBClient } from './IDBClient';
import { BaseStore } from './BaseStore';
import { GenericStore } from './GenericStore';

export abstract class BaseDBClient implements IDBClient {
  public stores: Record<string, BaseStore>;
  constructor() {
    this.stores = {};
  }
  public async registerStore(name: string, primaryKey = 'id'): Promise<void> {
    this.stores[name] = new GenericStore({
      name,
      primaryKey,
    });
    await Promise.resolve();
  }
  public async startStores(stores: string[]): Promise<void> {
    const reqs = [];
    for (const name of stores) {
      reqs.push(this.registerStore(name));
    }
    await Promise.resolve(reqs);
  }
  abstract connect(): void;
  abstract disconnect(): void;
}
