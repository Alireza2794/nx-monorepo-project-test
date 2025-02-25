import { productStoreMid } from './product-store.mid';

describe('productStoreMid', () => {
  it('should work', () => {
    expect(productStoreMid()).toEqual('product-store.mid');
  });
});
