import { productStoreState } from './product-store.state';

describe('productStoreState', () => {
  it('should work', () => {
    expect(productStoreState()).toEqual('product-store.state');
  });
});
