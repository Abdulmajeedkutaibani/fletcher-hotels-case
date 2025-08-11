<template>
  <select class="border rounded px-2 py-1 text-sm" v-model="locale">
    <option value="nl">NL</option>
    <option value="en">EN</option>
  </select>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
</script>
<script lang="ts">
export default {
  name: 'LanguageSwitcher',
};
</script>
