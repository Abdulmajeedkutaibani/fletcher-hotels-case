import { createI18n } from 'vue-i18n';
import nl from '~/locales/nl.json';
import en from '~/locales/en.json';
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const i18n = createI18n({
    legacy: false,
    locale: config.public.i18nDefault || 'nl',
    fallbackLocale: 'en',
    messages: { nl, en },
  });
  nuxtApp.vueApp.use(i18n);
});
