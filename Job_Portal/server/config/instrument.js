// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://1a28b10d843825ce43626f3350cdeeb3@o4509022880006144.ingest.us.sentry.io/4509022885249024",
  integrations:[
    Sentry.mongooseIntegration(),
  ],

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});