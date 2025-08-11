
<template>
  <div class="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="i in 6" :key="i" class="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div class="h-40 bg-gray-200"></div>
      <div class="p-4 space-y-3">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>
