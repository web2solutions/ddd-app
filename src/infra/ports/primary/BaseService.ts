/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import { BaseDataRepository } from '../secondary/BaseDataRepository';

export abstract class BaseService {
  private dataRepository: BaseDataRepository;

  constructor(dataRepository: BaseDataRepository) {
    this.dataRepository = dataRepository;
    console.log(this.dataRepository);
  }

  public create(data: unknown): unknown {
    console.log(data);
    throw new Error('Not implemented - create');
  }

  public update(id: unknown, data: unknown): unknown {
    console.log(id, data);
    throw new Error('Not implemented - update');
  }

  public find(): unknown {
    throw new Error('Not implemented - find');
  }

  public findOne(): unknown {
    throw new Error('Not implemented - findOne');
  }

  public deleteOne(): unknown {
    throw new Error('Not implemented - deleteOne');
  }

  public publish(): unknown {
    throw new Error('Not implemented - publish');
  }

  public request(): unknown {
    throw new Error('Not implemented - request');
  }

  // abstract find(string): Person;
}
