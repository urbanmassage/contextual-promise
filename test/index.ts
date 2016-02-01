import {expect} from 'chai';
import ContextualPromise = require('../lib/index');

describe('ContextualPromise', () => {
  it('passes context', () => {
    const ctx = {test: 1};
    return ContextualPromise
      .resolve(0)
      .bind(ctx)
      .then(function() {
        expect(this).to.deep.equal(ctx);
      });
  });
  
  it('passes context to executor', () => {
    const ctx = {test: 1};
    return new ContextualPromise(function (resolve, reject) {
      expect(this).to.deep.equal(ctx);
      resolve();
    }, ctx);
  });
  
  it('takes context as second argument', () => {
    const ctx = {test: 1};
    return new ContextualPromise(resolve => resolve(0), ctx)
      .then(function() {
        expect(this).to.deep.equal(ctx);
      });
  });
});
