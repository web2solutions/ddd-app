/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { BaseController } from '../../BaseController';
import { IApplication } from '../../../../application/index';

export class PaymentsController extends BaseController {
  public application: IApplication;
  constructor(application: IApplication) {
    super();
    this.application = application;
  }
  public create(data: unknown): unknown {
    console.log(data);
    // get service
    // get data repo
    // call use case by passing service and data repo
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
