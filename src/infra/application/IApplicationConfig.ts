import { EApplictionProcessType } from './EApplictionProcessType';
import { EhttpFrameworkType } from './EhttpFrameworkType';

export interface IApplicationConfig {
  name: string;
  instanceId: string;
  processType: EApplictionProcessType;
  httpFramework: EhttpFrameworkType;
  adapters: Record<string, string>;
  domains: string[];
}
