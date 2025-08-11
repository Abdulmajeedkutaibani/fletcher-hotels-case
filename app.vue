<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div
        class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"
      >
        <NuxtLink to="/hotels" class="font-semibold text-primary"
          >Mijn Fletcher</NuxtLink
        >
        <div class="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            v-if="isAuthed"
            class="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            @click="logout"
          >
            {{ t('common.logout') }}
          </button>
        </div>
      </div>
    </header>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import LanguageSwitcher from '~/components/LanguageSwitcher.vue';
const { t } = useI18n();
const auth = useAuthStore();
const { isAuthed } = storeToRefs(auth);
const logout = () => auth.logout();
</script>
