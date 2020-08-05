const TSLIB_GLOBALS = [
  '__extends',
  '__assign',
  '__rest',
  '__decorate',
  '__param',
  '__metadata',
  '__awaiter',
  '__generator',
  '__exportStar',
  '__values',
  '__read',
  '__spread',
  '__await',
  '__asyncGenerator',
  '__asyncDelegator',
  '__asyncValues',
  '__makeTemplateObject',
  '__importStar',
  '__importDefault',
  '__spreadArrays'
];

const globals = [
  'SharedArrayBuffer',
  'Atomics',
  ...TSLIB_GLOBALS
].join(',');

module.exports = {
  verbose: true,
  coverage: true,
  globals
};
