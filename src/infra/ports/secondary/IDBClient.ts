/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { BaseStore } from './BaseStore';

export interface IDBClient {
  stores: Record<string, BaseStore>
  connect(): void;
  disconnect(): void;
  registerStore(name: string, primaryKey: string): Promise<void>;
  startStores(stores: string[]): Promise<void>;
}
