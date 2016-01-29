import {expect} from 'chai';
import ContextualPromise = require('../lib/index');

describe('ContextualPromise', () => {
  it('passes context', done => {
    const ctx = {test: 1};
    ContextualPromise
      .resolve(0)
      .bind(ctx)
      .then(function() {
        let err;
        try {
          expect(this).to.deep.equal(ctx);
        } catch (_err) {err = _err;}
        done(err);
      });
  });
});
