<template>
  <aside class="bg-white rounded-lg p-4 h-fit sticky top-4">
    <!-- Provincie Section -->
    <section class="mb-6">
      <h3 class="font-semibold text-gray-900 mb-3">
        {{ $t('filters.province') }}
      </h3>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label
          v-for="p in options.provinces"
          :key="p"
          class="flex items-center gap-2 cursor-pointer hover:text-[#2B5BA0]"
        >
          <input
            type="checkbox"
            :value="p"
            v-model="filters.provinces"
            @change="onChange"
            class="w-4 h-4 text-[#2B5BA0] border-gray-300 rounded focus:ring-[#2B5BA0]"
          />
          <span class="text-sm">{{ p }}</span>
        </label>
      </div>
    </section>

    <!-- Thema Section -->
    <section class="mb-6">
      <h3 class="font-semibold text-gray-900 mb-3">
        {{ $t('filters.theme') }}
      </h3>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label
          v-for="t in options.themes"
          :key="t"
          class="flex items-center gap-2 cursor-pointer hover:text-[#2B5BA0]"
        >
          <input
            type="checkbox"
            :value="t"
            v-model="filters.themes"
            @change="onChange"
            class="w-4 h-4 text-[#2B5BA0] border-gray-300 rounded focus:ring-[#2B5BA0]"
          />
          <span class="text-sm">{{ t }}</span>
        </label>
      </div>
    </section>

    <!-- In de omgeving van Section -->
    <section>
      <h3 class="font-semibold text-gray-900 mb-3">
        {{ $t('filters.surroundings') }}
      </h3>
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label
          v-for="s in options.surroundings"
          :key="s"
          class="flex items-center gap-2 cursor-pointer hover:text-[#2B5BA0]"
        >
          <input
            type="checkbox"
            :value="s"
            v-model="filters.surroundings"
            @change="onChange"
            class="w-4 h-4 text-[#2B5BA0] border-gray-300 rounded focus:ring-[#2B5BA0]"
          />
          <span class="text-sm">{{ s }}</span>
        </label>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHotelsStore } from '~/stores/hotels';

const hotels = useHotelsStore();
const { filters, options } = storeToRefs(hotels);
const onChange = () => {
  hotels.page = 1;
  hotels.fetchHotels();
};
</script>
