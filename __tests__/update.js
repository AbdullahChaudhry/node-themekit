// these exports only exist in the mock
const update = require('../lib/update');
const runExecutable = require('../lib/run-executable');

jest.mock('../lib/utils');
jest.mock('../lib/logger', () => {
  return () => ({
    error: jest.fn(),
    info: jest.fn(),
    silly: jest.fn()
  });
});

jest.mock('../lib/run-executable');
jest.mock('../lib/config', () => {
  return {
    baseURL: 'example.com',
    version: '0.0.0',
    destination: 'myDir',
    binName: 'bin',
    update: {
      version: '1.1.3-pre'
    }
  };
});

describe('update', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call runExecutable with the correct arguments', async () => {
    const cwd = process.cwd();
    const logLevel = 'info';
    const args = ['update', '--version=v1.1.3-pre'];

    await update('info');

    expect(runExecutable).toBeCalledWith(args, cwd, logLevel);
  });
});
