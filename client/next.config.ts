import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: 'jonathan-cernero',
  project: 'javascript-nextjs',
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
