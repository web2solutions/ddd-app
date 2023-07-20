/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { BaseService } from '../../../infra/ports/primary';
import { BaseDataRepository } from '../../../infra/ports/secondary/BaseDataRepository';

export class PaymentsService extends BaseService {
  // private dataRepository: BaseDataRepository;

  // eslint-disable-next-line no-useless-constructor
  constructor(dataRepository: BaseDataRepository) {
    super(dataRepository);
    // this.dataRepository = dataRepository;
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
}
