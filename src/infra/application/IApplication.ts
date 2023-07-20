import { IDBClient } from '../ports/secondary';

export interface IApplication {
  name: string;
  instanceId: string;
  dbClient: IDBClient;
  status: string;
  start(): Promise<void>;
  stop(): Promise<void>;
}
