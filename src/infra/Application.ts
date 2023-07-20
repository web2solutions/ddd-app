/* eslint-disable no-console */
import { IDBClient } from './ports/secondary';
import { InMemoryDBClient } from './adapters/database/InMemoryDBClient';
import { MongooseDBClient } from './adapters/database/MongooseDBClient';
// import {
//   BaseService, BaseController
// } from './ports/primary';
import {
  EApplictionProcessType,
  EhttpFrameworkType,
  IApplicationConfig,
  IApplication,
} from './application/index';

export class Application implements IApplication {
  public name: string;
  public instanceId: string;
  public dbClient: IDBClient;
  public status: string;
  private networkClient: unknown;
  private processType: EApplictionProcessType;
  private httpFramework: EhttpFrameworkType;
  // private services: Record<string, BaseService>;
  // private controllers: Record<string, BaseController>;
  private domains: string[];
  constructor({
    name,
    instanceId,
    processType,
    httpFramework,
    adapters,
    domains,
  }: IApplicationConfig) {
    this.name = name;
    this.instanceId = instanceId;
    this.processType = processType;
    this.httpFramework = httpFramework;
    this.status = 'active';
    this.domains = domains;
    const { db/* , network */ } = adapters;
    if (db === 'mongoose') {
      this.dbClient = new MongooseDBClient();
    } else {
      this.dbClient = new InMemoryDBClient();
    }

    // this.services = {};
    // this.controllers = {};
  }

  public async start(): Promise<void> {
    await Promise.resolve(this.dbClient.connect());
    await this.dbClient.startStores(this.domains);
    // await this.dbClient.disconnect();
  }

  public async stop(): Promise<void> {
    await Promise.resolve(this.dbClient.disconnect());
  }
}
