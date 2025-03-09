import { storeMainState } from './store-main.state';

describe('storeMainState', () => {
  it('should work', () => {
    expect(storeMainState()).toEqual('store-main.state');
  });
});
