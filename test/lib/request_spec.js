/* jslint node: true */

const chai = require('chai'),
      expect = chai.expect,
      lab = exports.lab = require('lab').script(),
      describe = lab.describe,
      it = lab.it,
      nock = require('nock'),
      URL = require('url'),
      request = require('../../src/lib/request');

const _getContext = () => {
  let ctx = {
    meta: []
  };
  ctx.fetch = request.fetch(ctx);
  return ctx;
};

const _prepareHttpMock = (endPoint) => {
  const urlObj = URL.parse(endPoint);
  const mock = nock(urlObj.protocol + '//' + urlObj.host)
    .get(urlObj.pathname);
  return mock;
};

lab.beforeEach(() => {
  nock.cleanAll();
});

describe('fetch not working', () => {
  it('should handle http error with non-json response', () => {
    const context = _getContext();

    const url = 'http://local/path3';
    const mock = _prepareHttpMock(url);
    mock.reply(503, function (uri, requestBody) {
      return 'error message';
    });

    return context.fetch(url, {}).catch(error => {
      expect(error.message).to.be.equal('HTTP Error');
      expect(error.name).to.be.equal('HTTPError');
      expect(error.data.message).to.be.equal('error message');
      expect(error.data.url).to.be.equal(url);
      expect(context.meta).to.have.lengthOf(2);
      expect(context.meta[0].url).to.equal(url);
      expect(context.meta[0].err).to.be.undefined;
      expect(context.meta[0].body).to.undefined;
      expect(context.meta[1].message).to.equal('error message');
      expect(context.meta[1].name).to.equal('HTTP Error 503');
    });
  });
});

