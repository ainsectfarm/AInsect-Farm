import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'pl', 'uk'],
  defaultLocale: 'en'
});
