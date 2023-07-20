import {
  Application,
} from '../../src/infra';

import {
  EApplictionProcessType,
  EhttpFrameworkType,
} from '../../src/infra/application/index';

describe('application unit test', () => {
  it('test constructor - application public properties - memory db adapter', () => {
    expect.hasAssertions();
    const instanceId = `${Math.random()}`;
    const application = new Application({
      name: 'Payment System',
      instanceId,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'memory',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    expect(application.status).toStrictEqual('active');
    expect(application.name).toStrictEqual('Payment System');
    expect(application.instanceId).toStrictEqual(instanceId);
  });

  it('test constructor - application public properties - mongooose db adapter', () => {
    expect.hasAssertions();
    const instanceId = `${Math.random()}`;
    const application = new Application({
      name: 'Payment System',
      instanceId,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'mongoose',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    expect(application.status).toStrictEqual('active');
    expect(application.name).toStrictEqual('Payment System');
    expect(application.instanceId).toStrictEqual(instanceId);
  });

  it('should properly start with inMemory database', async () => {
    expect.hasAssertions();
    const instanceId = `${Math.random()}`;
    const application = new Application({
      name: 'Payment System',
      instanceId,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'memory',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    await application.start();

    expect(application.status).toStrictEqual('active');
    expect(application.name).toStrictEqual('Payment System');
    expect(application.instanceId).toStrictEqual(instanceId);
  });

  it('should properly start with mongoose database', async () => {
    expect.hasAssertions();
    const instanceId = `${Math.random()}`;
    const application = new Application({
      name: 'Payment System',
      instanceId,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'mongoose',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    await application.start();

    expect(application.status).toStrictEqual('active');
    expect(application.name).toStrictEqual('Payment System');
    expect(application.instanceId).toStrictEqual(instanceId);
  });

  it('inMemory dbClient must provide the Payments store', async () => {
    expect.hasAssertions();
    const application = new Application({
      name: 'Payment System',
      instanceId: `${Math.random()}`,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'memory',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    await application.start();

    expect(application.dbClient.stores.Payments).toBeDefined();
  });

  it('mongoose dbClient must provide the Payments store', async () => {
    expect.hasAssertions();
    const application = new Application({
      name: 'Payment System',
      instanceId: `${Math.random()}`,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'mongoose',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    await application.start();

    expect(application.dbClient.stores.Payments).toBeDefined();
  });

  it('application must properly stop - memory', async () => {
    expect.hasAssertions();
    const application = new Application({
      name: 'Payment System',
      instanceId: `${Math.random()}`,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'memory',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    await application.start();

    expect(application.dbClient.stores.Payments).toBeDefined();

    await application.stop();

    expect(application.dbClient.stores.Payments).toBeDefined();
  });

  it('application must properly stop - mongoose', async () => {
    expect.hasAssertions();
    const application = new Application({
      name: 'Payment System',
      instanceId: `${Math.random()}`,
      processType: EApplictionProcessType.ondemand,
      httpFramework: EhttpFrameworkType.lambda,
      adapters: {
        db: 'mongoose',
        network: 'HTTP',
      },
      domains: ['Payments'],
    });

    await application.start();

    expect(application.dbClient.stores.Payments).toBeDefined();

    await application.stop();

    expect(application.dbClient.stores.Payments).toBeDefined();
  });
});
