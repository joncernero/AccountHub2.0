import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://2e05e00ffe256390b32448346301ab04@o4508961728626688.ingest.us.sentry.io/4508961743568896',

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
