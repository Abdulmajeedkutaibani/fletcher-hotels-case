import { ofetch } from 'ofetch';
import { useAuthStore } from '~/stores/auth';
export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;
  const auth = useAuthStore();
  const $api = ofetch.create({
    baseURL,
    onRequest({ options }) {
      if (auth.token) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${auth.token}`,
        };
      }
    },
  });
  return $api;
};
