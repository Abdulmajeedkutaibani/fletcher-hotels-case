import { defineStore } from 'pinia';
type User = { email: string };
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    user: null as User | null,
  }),
  getters: {
    isAuthed: (s) => !!s.token,
  },
  actions: {
    async login(email: string, password: string) {
      // Endpoint per Swagger; adjust if needed.
      // Typical: POST /auth/login { email, password } -> { access_token }
      const $api = useApi();
      try {
        const res: any = await $api('/auth/login', {
          method: 'POST',
          body: { email, password },
        });
        this.token = res.apiToken || '';
        this.user = { email };
      } catch (e: any) {
        throw new Error(e?.data?.message || 'Invalid credentials');
      }
    },

    async register(payload: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      terms: boolean;
    }) {
      const $api = useApi();
      // Swagger: POST /auth/register — body is the user object
      const res: any = await $api('/auth/register', {
        method: 'POST',
        body: payload,
      });
      // Option A: auto‑login after register:
      this.token = res?.apiToken || '';
      this.user = { email: payload.email };
      return res;
    },

    logout() {
      this.token = '';
      this.user = null;
      navigateTo('/login');
    },
  },
});
