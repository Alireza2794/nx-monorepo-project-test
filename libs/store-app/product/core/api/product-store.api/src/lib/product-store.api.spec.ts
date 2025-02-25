import { productStoreApi } from './product-store.api';

describe('productStoreApi', () => {
  it('should work', () => {
    expect(productStoreApi()).toEqual('product-store.api');
  });
});
