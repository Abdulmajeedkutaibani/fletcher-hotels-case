<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        {{ t('hotels.title') }}
      </h1>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
      <!-- Filters Sidebar -->
      <FiltersSidebar />

      <!-- Hotels Grid -->
      <section>
        <!-- Available Count -->
        <div class="text-sm text-gray-600 mb-4">
          {{ t('hotels.available', { count: available }) }}
        </div>

        <!-- Loading State -->
        <LoaderSkeleton v-if="loading" />

        <!-- Empty State -->
        <EmptyState v-else-if="!loading && !items.length" />

        <!-- Hotels List -->
        <div v-else class="space-y-4">
          <HotelCard v-for="h in items" :key="h.id" :hotel="h" />
        </div>

        <!-- Pagination -->
        <div v-if="items.length" class="flex flex-col items-center mt-8 gap-3">
          <div class="text-sm text-gray-600">
            {{ t('hotels.available', { count: available }) }} · {{ page }} /
            {{ totalPages }}
          </div>
          <div class="flex justify-center items-center gap-2">
            <button
              class="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              :disabled="page <= 1 || loading"
              @click="hotels.prevPage()"
              aria-label="Previous"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <template v-for="p in visiblePages" :key="p">
              <button
                v-if="p !== '…'"
                class="w-8 h-8 rounded"
                :class="
                  p === page
                    ? 'bg-[#2B5BA0] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                "
                @click="hotels.setPage(Number(p))"
                :aria-current="p === page ? 'page' : undefined"
              >
                {{ p }}
              </button>
              <span
                v-else
                class="w-8 h-8 flex items-center justify-center text-gray-400"
                >…</span
              >
            </template>
            <button
              class="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              :disabled="page >= totalPages || loading"
              @click="hotels.nextPage()"
              aria-label="Next"
            >
              <svg
                class="w-4 h-4 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error State -->
        <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useHotelsStore } from '~/stores/hotels';

const { t } = useI18n();
const hotels = useHotelsStore();
const { items, loading, error, availableCount, page, totalPages } =
  storeToRefs(hotels);
const available = computed(() => availableCount.value || items.value.length);

// Build a compact list of visible page numbers with ellipses
const visiblePages = computed(() => {
  const pages: (number | '…')[] = [];
  const last = totalPages.value || 1;
  const current = page.value || 1;
  const add = (p: number | '…') => pages.push(p);
  if (last <= 7) {
    for (let p = 1; p <= last; p += 1) add(p);
    return pages;
  }
  add(1);
  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);
  if (start > 2) add('…');
  for (let p = start; p <= end; p += 1) add(p);
  if (end < last - 1) add('…');
  add(last);
  return pages;
});

onMounted(async () => {
  await hotels.fetchOptions();
  await hotels.fetchHotels();
});
</script>
