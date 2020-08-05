/* jslint node: true */

const request = require('got'),
      AgentKeepAlive = require('agentkeepalive'),
      httpAgent = new AgentKeepAlive(),
      HTTPError = require('apollo-errors').createError('HTTPError', {
        data: { code: 500 },
        message: 'HTTP Error',
        options: { showPath: true, showLocations: true }
      });


const addMeta = (context, obj) => {
  if (context.meta && context.meta.push) {
    context.meta.push(obj);
  }
};

const requestWithContext = async (context, url) => {
  let options = {
    method: 'GET', // the default, adding for verbosity
    agent: {
      http: httpAgent
    },
    decompress: true, // the default, adding for verbosity
    responseType: 'text', // the default, adding for verbosity
    timeout: 1000,
    uri: url,
    headers: {}
  };
  // do request
  return request(url, options).then(res => {
    return "success";
  }).catch(err => { // deal with errors
    addMeta(context, { name: err.name, message: err.message });
    throw new HTTPError({ data: { error: err.name, message: err.message, url: url } });
  });
};

const req = (context) => {
  return (url, options) => {
    return requestWithContext(context, url, options);
  };
};

module.exports = {
  fetch: req
};
