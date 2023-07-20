/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import {
  BaseStore,
  GenericStore,
  BaseDBClient,
} from '../../../ports/secondary';

export class MongooseDBClient extends BaseDBClient {
  public stores: Record<string, BaseStore>;

  constructor() {
    super();

    this.stores = {};
  }

  public async registerStore(name: string, primaryKey = '_id'): Promise<void> {
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

  public connect(): void {
    //
  }

  public disconnect(): void {
    //
  }
}
