<template>
  <main class="max-w-md mx-auto px-4 py-10">
    <section class="bg-white rounded-2xl shadow-sm border p-6">
      <h1 class="text-2xl font-semibold mb-1">{{ t('forgot.title') }}</h1>
      <p class="text-gray-600 mb-6">{{ t('forgot.subtitle') }}</p>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm font-medium mb-1">{{
            t('login.email')
          }}</label>
          <input
            v-model.trim="email"
            type="email"
            required
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <button
          class="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
        >
          {{ t('forgot.reset') }}
        </button>
        <NuxtLink
          to="/login"
          class="block text-center text-sm text-primary hover:underline"
          >{{ t('forgot.remember') }}</NuxtLink
        >
      </form>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const email = ref('');
const onSubmit = async () => {
  const $api = useApi();
  await $api('/auth/password/forgot', {
    method: 'POST',
    query: { email: email.value },
  });
  await navigateTo('/login');
};
</script>
