describe('dynamic-content-client-config', (): void => {
  const OLD_ENV = process.env;

  beforeEach((): void => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.DYNAMIC_CONTENT_ACCOUNT_NAME;
    delete process.env.DYNAMIC_CONTENT_MEDIA_HOST;
    delete process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST;
  });

  afterEach((): void => {
    process.env = OLD_ENV;
  });
  test('it should set all config values to their respective env var', (): void => {
    process.env.DYNAMIC_CONTENT_ACCOUNT_NAME = 'account-id';
    process.env.DYNAMIC_CONTENT_MEDIA_HOST = 'custom-media-host.amplience.net';
    process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST = 'custom-secure-media-host.amplience.net';

    const defaultClientConfig = require('./dynamic-content-client-config').defaultClientConfig;

    expect(defaultClientConfig).toEqual({
      account: 'account-id',
      mediaHost: 'custom-media-host.amplience.net',
      secureMediaHost: 'custom-secure-media-host.amplience.net'
    });
  });

  test('it should set all config values as empty strings if no env var set', (): void => {
    const defaultClientConfig = require('./dynamic-content-client-config').defaultClientConfig;

    expect(defaultClientConfig).toEqual({
      account: '',
      mediaHost: '',
      secureMediaHost: ''
    });
  });
});
