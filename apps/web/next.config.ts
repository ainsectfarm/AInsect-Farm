import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const devOrigin = process.env.NEXT_PUBLIC_DEV_ORIGIN || '127.0.0.1';

const nextConfig: NextConfig = {
  allowedDevOrigins: [devOrigin],
  async redirects() {
    return [
      // Stare adresy biznes planu (z v3.2) → nowe, bez wersji
      { source: '/biznes-plan-v3.2.html',      destination: '/biznes-plan.html',      permanent: true },
      { source: '/business-plan-v3.2-en.html', destination: '/business-plan-en.html', permanent: true },
      { source: '/businessplan-v3.2-de.html',  destination: '/businessplan-de.html',  permanent: true },
      { source: '/biznes-plan-v3.2-uk.html',   destination: '/biznes-plan-uk.html',   permanent: true },
    ]
  },
};

export default withNextIntl(nextConfig);
