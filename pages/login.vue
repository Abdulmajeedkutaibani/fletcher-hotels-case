<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background with blue overlay -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-blue-900/95 z-10"
      ></div>
      <img src="" alt="Hotel interior" class="w-full h-full object-cover" />
    </div>

    <!-- Main Content -->
    <div
      class="relative z-20 flex items-center justify-center min-h-[calc(100vh-120px)] px-4"
    >
      <div class="flex gap-8 max-w-5xl w-full">
        <!-- Login Form -->
        <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <h1 class="text-2xl font-semibold text-gray-900 mb-2">
            {{ t('login.title') }}
          </h1>
          <p class="text-gray-600 mb-6">
            {{ t('login.subtitle') }}
          </p>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-700 mb-2">
                {{ t('login.email') }}
              </label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  @
                </span>
                <input
                  v-model.trim="email"
                  type="email"
                  required
                  :placeholder="t('login.email') + '…'"
                  class="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm text-gray-700 mb-2">
                {{ t('login.password') }}
              </label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  ••
                </span>
                <input
                  v-model.trim="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  class="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div class="flex items-center justify-between text-sm">
              <NuxtLink to="/forgot" class="text-primary hover:underline">{{
                t('login.forgot')
              }}</NuxtLink>
              <NuxtLink to="/register" class="text-primary hover:underline">{{
                t('register.title')
              }}</NuxtLink>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span v-if="!loading">{{ t('login.continue') }}</span>
              <span v-else>{{ t('common.loading') }}</span>
              <svg
                v-if="!loading"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </form>

          <p v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</p>
        </div>

        <!-- Right Panel - Mijn Fletcher Benefits -->
        <div class="relative">
          <!-- Orange badge -->
          <div
            class="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 z-10"
          >
            {{ t('login.freeBenefits') }}
          </div>

          <div
            class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl text-white"
          >
            <div class="mb-6">
              <h2 class="text-3xl font-bold mb-2">mijn</h2>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-light tracking-wider">FLETCHER</span>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-lg font-semibold">
                {{ t('login.whyMyFletcher') }}
              </h3>

              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 mt-0.5 text-orange-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    />
                  </svg>
                  <span class="font-medium">{{ t('login.benefit1') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 mt-0.5 text-orange-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                    />
                  </svg>
                  <span class="font-medium">{{ t('login.benefit2') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 mt-0.5 text-orange-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                    />
                  </svg>
                  <span class="font-medium">{{ t('login.benefit3') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 mt-0.5 text-orange-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                  <span class="font-medium">{{ t('login.benefitMore') }}</span>
                </li>
              </ul>

              <NuxtLink
                to="/register"
                class="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 rounded-lg hover:bg-white/20 transition duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="font-medium">{{ t('register.create') }}</span>
              </NuxtLink>

              <p class="text-xs text-center text-gray-300 mt-4">
                {{ t('login.quickSetup') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="relative z-20 text-white text-sm p-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <p>{{ t('login.copyright') }}</p>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:underline">{{ t('footer.terms') }}</a>
          <span>|</span>
          <a href="#" class="hover:underline">{{ t('footer.cookies') }}</a>
          <span>|</span>
          <a href="#" class="hover:underline">{{ t('footer.privacy') }}</a>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { navigateTo } from '#app';
import LanguageSwitcher from '~/components/LanguageSwitcher.vue';
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';
const { t } = useI18n();
const auth = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const onSubmit = async () => {
  loading.value = true;
  error.value = '';
  try {
    await auth.login(email.value, password.value);
    navigateTo('/hotels');
  } catch (e: any) {
    error.value = e?.message || t('login.error');
    const el = document.querySelector('form') as HTMLElement | null;
    if (el) {
      el.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0)' },
        ],
        { duration: 300 }
      );
    }
  } finally {
    loading.value = false;
  }
};
</script>
