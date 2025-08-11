<template>
  <article
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex"
  >
    <!-- Image Section -->
    <div class="relative w-80 h-48 flex-shrink-0">
      <img
        :src="getImageUrl()"
        :alt="hotel.name"
        class="w-full h-full object-cover"
        @error="handleImageError"
        loading="lazy"
      />
      <!-- Fallback content when image fails -->
      <div
        v-if="imageError"
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200"
      >
        <div class="text-center">
          <svg
            class="w-16 h-16 text-blue-400 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span class="text-sm text-blue-600 font-medium">{{
            hotel.name.split(' ')[0]
          }}</span>
        </div>
      </div>
      <!-- Favorite Button -->
      <button
        class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
      >
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>

    <!-- Content Section -->
    <div class="flex-1 p-4 flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-start mb-2">
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900 mb-1">{{ hotel.name }}</h3>
          <p class="text-sm text-gray-500 flex items-center gap-1">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {{ hotel.city
            }}<span v-if="hotel.province">, {{ hotel.province }}</span>
          </p>
        </div>
        <!-- Price Badge -->
        <div class="text-right">
          <div class="bg-orange-500 text-white px-3 py-2 rounded-lg">
            <div class="text-2xl font-bold">
              €{{ (hotel.pricePerNight || 0).toFixed(2) }}
            </div>
            <div class="text-xs">{{ $t('hotelCard.perPersonPerNight') }}</div>
            <div class="text-xs">{{ $t('hotelCard.exclBreakfast') }}</div>
          </div>
        </div>
      </div>

      <!-- Amenities Icons -->
      <div class="flex items-center gap-4 mb-3">
        <span class="flex items-center gap-1 text-orange-500">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </span>
        <span class="flex items-center gap-1 text-orange-500">
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
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        </span>
        <span class="flex items-center gap-1 text-orange-500">
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
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </span>
        <span class="flex items-center gap-1 text-orange-500">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </span>
        <span class="flex items-center gap-1 text-orange-500">
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </span>
      </div>

      <!-- Features List -->
      <div class="flex-1 space-y-1 mb-3">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span class="text-orange-500">✓</span>
          <span>{{ hotel.features?.[0] || $t('hotelCard.feature1') }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span class="text-orange-500">✓</span>
          <span>{{ hotel.features?.[1] || $t('hotelCard.feature2') }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span class="text-orange-500">✓</span>
          <span>{{ hotel.features?.[2] || $t('hotelCard.feature3') }}</span>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex items-center justify-between pt-3 border-t">
        <div class="flex items-center gap-4">
          <!-- Rating -->
          <div class="flex items-center gap-2">
            <span
              class="bg-[#2B5BA0] text-white px-2 py-1 rounded text-sm font-bold"
            >
              {{ (hotel.rating || 8.4).toFixed(1) }}
            </span>
            <div class="text-sm">
              <div class="font-medium text-gray-700">
                {{ $t('hotelCard.ratingLabel') }}
              </div>
              <div class="text-xs text-gray-500">
                {{ hotel.reviews || 298 }} {{ $t('hotelCard.reviews') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <button class="text-[#2B5BA0] hover:underline text-sm font-medium">
            {{ $t('hotels.moreInfo') }} ⓘ
          </button>
          <button
            class="bg-[#2B5BA0] text-white px-4 py-2 rounded hover:bg-[#234a8a] text-sm font-medium flex items-center gap-1"
          >
            {{ $t('hotels.chooseDate') }}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{ hotel: any }>();
const imageError = ref(false);
// Get image URL with multiple fallback options
const getImageUrl = (): string => {
  // If we already know the image failed, use placeholder
  if (imageError.value) {
    return `https://via.placeholder.com/640x360/e3f2fd/1976d2?text=${encodeURIComponent(
      props.hotel.name || 'Fletcher Hotel'
    )}`;
  }

  // Try different image sources
  if (props.hotel.imageUrl) {
    // If it's the Fletcher API URL, it might not be accessible
    // Try using a public placeholder service instead
    if (props.hotel.imageUrl.includes('fletcher.build')) {
      // Extract seed from URL if possible
      const seedMatch = props.hotel.imageUrl.match(/seed=(\d+)/);
      const seed = seedMatch ? seedMatch[1] : props.hotel.id;

      // Use public placeholder services
      return `https://picsum.photos/seed/${seed}/640/360`;
    }
    return props.hotel.imageUrl;
  }

  // Fallback to placeholder with hotel ID
  return `https://picsum.photos/seed/${props.hotel.id}/640/360`;
};
onMounted(() => {
  console.log(
    '[HotelCard] id:',
    props.hotel?.id,
    'imageUrl:',
    props.hotel?.imageUrl
  );
});
</script>
