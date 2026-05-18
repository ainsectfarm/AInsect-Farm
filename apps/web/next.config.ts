import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const devOrigin = process.env.NEXT_PUBLIC_DEV_ORIGIN || '127.0.0.1';

const nextConfig: NextConfig = {
  allowedDevOrigins: [devOrigin],
};

export default withNextIntl(nextConfig);
