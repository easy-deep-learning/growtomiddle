// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://fdaa4994b2d49fd32b80a4269067a727@o4505900345982976.ingest.sentry.io/4506390019768320',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Replay is automatically enabled when replaysSessionSampleRate or replaysOnErrorSampleRate are set
  // If you need custom Replay configuration, you can add it to integrations:
  // integrations: [
  //   new (await import('@sentry/replay')).Replay({
  //     maskAllText: true,
  //     blockAllMedia: true,
  //   }),
  // ],
});
