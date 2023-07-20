/* eslint-disable class-methods-use-this */
import { BaseStore, BaseDBClient } from '../../../ports/secondary';

export class InMemoryDBClient extends BaseDBClient {
  public stores: Record<string, BaseStore>;

  constructor() {
    super();

    this.stores = {};
  }

  public connect(): void {
    //
  }

  public disconnect(): void {
    //
  }
}
