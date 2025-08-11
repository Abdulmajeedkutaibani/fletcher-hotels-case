<template>
  <main class="max-w-2xl mx-auto px-4 py-10">
    <section class="bg-white rounded-2xl shadow-sm border p-6">
      <h1 class="text-2xl font-semibold mb-1">{{ t('register.title') }}</h1>
      <p class="text-gray-600 mb-6">{{ t('register.subtitle') }}</p>
      <form
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
        @submit.prevent="onSubmit"
      >
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">{{
            t('register.titleField')
          }}</label>
          <select v-model="title" class="w-full border rounded-lg px-3 py-2">
            <option>{{ t('register.mrs') }}</option>
            <option>{{ t('register.mr') }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{
            t('register.firstName')
          }}</label>
          <input
            v-model.trim="firstName"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{
            t('register.infix')
          }}</label>
          <input
            v-model.trim="infix"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{
            t('register.lastName')
          }}</label>
          <input
            v-model.trim="lastName"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{
            t('register.email')
          }}</label>
          <input
            v-model.trim="email"
            type="email"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">{{
            t('register.password')
          }}</label>
          <input
            v-model.trim="password"
            type="password"
            required
            minlength="8"
            class="w-full border rounded-lg px-3 py-2"
          />
          <div class="text-xs text-gray-500 mt-1">
            {{ t('register.passwordHint') }}
          </div>
        </div>
        <div class="md:col-span-2">
          <label class="inline-flex items-center gap-2 text-sm">
            <input
              v-model="terms"
              type="checkbox"
              class="rounded border-gray-300 text-primary focus:ring-primary"
            />
            {{ t('register.acceptTerms') }}
          </label>
          <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
        </div>
        <div class="md:col-span-2">
          <button
            class="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
          >
            {{ t('register.create') }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/stores/auth';

const { t } = useI18n();
const auth = useAuthStore();

const title = ref('Mevr.');
const firstName = ref('');
const infix = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const newsletter = ref(false);
const terms = ref(false); // ✅ must be true per Swagger
const loading = ref(false);
const error = ref('');
const onSubmit = async () => {
  error.value = '';
  if (!terms.value) {
    error.value = 'Accepteer de voorwaarden a.u.b.';
    return;
  }
  loading.value = true;
  try {
    await auth.register({
      title: title.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      terms: true,
    });
    // If you don’t want auto‑login, comment the next line and navigate to /login instead.
    await navigateTo('/hotels');
  } catch (e: any) {
    error.value = e?.message || 'Registratie mislukt';
  } finally {
    loading.value = false;
  }
};
</script>
