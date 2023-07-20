/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import { faker } from '@faker-js/faker';

import {
  GenericStore,
  IGenericRecord,
  IGenericUUID,
  IPagingResponse,
} from '../../../../src/infra/ports/secondary';

function createRandomPayments(): IGenericRecord {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

const PAYMENTS: IGenericRecord[] = faker.helpers.multiple(createRandomPayments, {
  count: 5,
});

describe('generic store unit test', () => {
  it('test constructor - store public properties', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
    });

    expect(store.name).toStrictEqual('Payments');
    expect(store.primaryKey).toStrictEqual('_id');
  });

  it('create record must works', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    const data = {
      foo: 'bar',
      bah: 'baz',
    };

    const record: IGenericRecord = store.create(data);

    expect(record._id).toBeDefined();
    expect(record.foo).toStrictEqual(data.foo);
    expect(record.bah).toStrictEqual(data.bah);
  });

  it('should not be able to assign primary key value when passing data to create', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    const data = {
      _id: 'aaaaaaa',
      foo: 'bar',
      bah: 'baz',
    };

    const record: IGenericRecord = store.create(data);

    expect(record._id).toBeDefined();
    expect(record._id !== data._id).toBe(true);
    expect(record.foo).toStrictEqual(data.foo);
    expect(record.bah).toStrictEqual(data.bah);
  });

  it('update record must works', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    const data = {
      foo: 'bar',
      bah: 'baz',
    };

    const record: IGenericRecord = store.create(data);

    expect(record._id).toBeDefined();
    expect(record.foo).toStrictEqual(data.foo);
    expect(record.bah).toStrictEqual(data.bah);

    const updated = store.update(record._id as IGenericUUID, { bah: 'jose' });
    expect(updated?.foo).toStrictEqual(data.foo);
    expect(updated?.bah).toStrictEqual('jose');
  });

  it('update record with invalid id must not works', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    const updated = store.update('fake_id' as IGenericUUID, { bah: 'jose' });
    expect(updated).toBeUndefined();
  });

  it('findOne record must works', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    const data = {
      foo: 'bar',
      bah: 'baz',
    };

    const record = store.create(data);
    expect(record._id).toBeDefined();
    expect(record.foo).toStrictEqual(data.foo);
    expect(record.bah).toStrictEqual(data.bah);

    const found = store.findOne(record._id as IGenericUUID);
    expect(found?.foo).toStrictEqual(data.foo);
    expect(found?.bah).toStrictEqual(data.bah);
  });

  it('deleteOne record must works', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    const data = {
      foo: 'bar',
      bah: 'baz',
    };

    const record = store.create(data);
    expect(record._id).toBeDefined();
    expect(record.foo).toStrictEqual(data.foo);
    expect(record.bah).toStrictEqual(data.bah);

    const deleted = store.deleteOne(record._id as IGenericUUID);
    expect(deleted).toBe(true);

    const found = store.findOne(record._id as IGenericUUID);
    expect(found).toBeUndefined();
  });

  it('find records without query must works - test paging default values', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    for (const data of PAYMENTS) {
      store.create(data);
    }

    const response: IPagingResponse<IGenericRecord> = store.find();
    const {
      page, size, result, total,
    } = response;
    expect(total).toBe(5);
    expect(result).toHaveLength(5);
    expect(page).toBe(1);
    expect(size).toBe(30);
    expect(result as IGenericRecord[][0]).toBeDefined();
  });

  it('find records with query must works - page 1, size 1 must return 1', () => {
    expect.hasAssertions();
    const store = new GenericStore({
      name: 'Payments',
      primaryKey: '_id',
    });

    for (const data of PAYMENTS) {
      store.create(data);
    }

    const response: IPagingResponse<IGenericRecord> = store.find({
      page: 1,
      size: 1,
    });
    const {
      page, size, result, total,
    } = response;
    expect(total).toBe(5);
    expect(result).toHaveLength(1);
    expect(page).toBe(1);
    expect(size).toBe(1);
    expect(result as IGenericRecord[][0]).toBeDefined();
  });
});
