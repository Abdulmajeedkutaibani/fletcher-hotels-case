import { defineStore } from 'pinia';
import { useApi, useRuntimeConfig } from '#imports';
type Hotel = {
  id: number | string;
  name: string;
  city?: string;
  province?: string;
  pricePerNight?: number;
  rating?: number;
  reviews?: number;
  facilities?: string[];
  imageUrl?: string;
  tags?: string[];
};
type Filters = {
  provinces: string[];
  themes: string[];
  surroundings: string[];
  sort?: 'price_asc' | 'price_desc';
};
export const useHotelsStore = defineStore('hotels', {
  state: () => ({
    items: [] as Hotel[],
    loading: false,
    error: '' as string,
    availableCount: 0,
    // Pagination state
    page: 1 as number,
    perPage: 10 as number,
    totalPages: 1 as number,
    filters: {
      provinces: [],
      themes: [],
      surroundings: [],
      sort: 'price_asc',
    } as Filters,
    options: {
      provinces: [] as string[],
      themes: [] as string[],
      surroundings: [] as string[],
    },
  }),
  actions: {
    setPage(page: number) {
      const safePage = Math.max(1, Math.floor(page || 1));
      this.page =
        this.totalPages > 0 ? Math.min(safePage, this.totalPages) : safePage;
      return this.fetchHotels();
    },
    nextPage() {
      return this.setPage(this.page + 1);
    },
    prevPage() {
      return this.setPage(this.page - 1);
    },
    setPerPage(perPage: number) {
      const safePerPage = Math.max(1, Math.floor(perPage || 10));
      this.perPage = safePerPage;
      this.page = 1;
      return this.fetchHotels();
    },
    async fetchOptions() {
      const $api = useApi();
      try {
        const res: any = await $api('/hotels');
        const list = (res?.data || []) as any[];
        const provinces = new Set<string>();
        const themes = new Set<string>();
        const facilitiesSet = new Set<string>();
        for (const h of list) {
          if (typeof h?.province === 'string' && h.province)
            provinces.add(h.province);
          if (typeof h?.theme === 'string' && h.theme) themes.add(h.theme);
          const fac = Array.isArray(h?.facilities)
            ? (h.facilities as string[])
            : typeof h?.facilities === 'string' && h.facilities
            ? [h.facilities as string]
            : [];
          for (const f of fac) if (f) facilitiesSet.add(f);
        }
        this.options.provinces = Array.from(provinces).sort();
        this.options.themes = Array.from(themes).sort();
        this.options.surroundings = Array.from(facilitiesSet).sort();
      } catch {
        // Fallback to mock dataset to derive options
        const mock = await $fetch<any[]>('/mock/hotels.json');
        const provinces = new Set<string>();
        const themes = new Set<string>();
        const facilitiesSet = new Set<string>();
        for (const h of mock || []) {
          if (typeof (h as any)?.province === 'string' && (h as any).province)
            provinces.add((h as any).province);
          if (typeof (h as any)?.theme === 'string' && (h as any).theme)
            themes.add((h as any).theme);
          const fac = Array.isArray((h as any)?.facilities)
            ? ((h as any).facilities as unknown as string[])
            : typeof (h as any)?.facilities === 'string' &&
              (h as any).facilities
            ? [(h as any).facilities as unknown as string]
            : [];
          for (const f of fac) if (f) facilitiesSet.add(f);
        }
        this.options.provinces = Array.from(provinces).sort();
        this.options.themes = Array.from(themes).sort();
        this.options.surroundings = Array.from(facilitiesSet).sort();
      }
    },
    async fetchHotels() {
      const $api = useApi();
      this.loading = true;
      this.error = '';
      try {
        // Map local filter state to API query parameters
        const query: Record<string, string> = {};
        if (this.filters.themes.length) {
          query['Filter[theme]'] = this.filters.themes.join(',');
        }
        if (this.filters.surroundings.length) {
          // API calls these facilities
          query['Filter[facilities]'] = this.filters.surroundings.join(',');
        }
        if (this.filters.provinces.length) {
          query['Filter[province]'] = this.filters.provinces.join(',');
        }
        if (this.filters.sort) {
          const sortParam =
            this.filters.sort === 'price_desc' ? '-price' : 'price';
          query.sort = sortParam;
        }
        // Pagination params (common conventions)
        query.page = String(this.page);
        query.per_page = String(this.perPage);
        let res: any;
        try {
          res = await $api('/hotels', { query });
          const list = (res?.data || []) as any[];
          const config = useRuntimeConfig();
          const rawBase = (config?.public as any)?.apiBase as
            | string
            | undefined;
          const apiBase = (
            typeof rawBase === 'string' && rawBase.length
              ? rawBase
              : 'https://frontend-case-api.alpha.fletcher.build/api'
          ).replace(/\/$/, '');
          // Normalize API hotel to UI model
          this.items = list.map((h) => ({
            id: h.id,
            name: h.name,
            city: h.city,
            province: h.province,
            pricePerNight: typeof h.price === 'number' ? h.price : undefined,
            facilities: Array.isArray(h.facilities)
              ? h.facilities
              : typeof h.facilities === 'string' && h.facilities
              ? [h.facilities]
              : [],
            imageUrl: undefined,
            rating: undefined,
            reviews: undefined,
            tags: undefined,
          }));
          // Update pagination meta if provided by API
          const meta = (res?.meta || {}) as Record<string, any>;
          const totalRaw = meta.total ?? res?.total ?? this.items.length;
          const perPageRaw =
            meta.per_page ??
            meta.perPage ??
            res?.per_page ??
            res?.perPage ??
            this.perPage;
          const currentPageRaw =
            meta.current_page ??
            meta.currentPage ??
            res?.current_page ??
            res?.currentPage ??
            this.page;
          const lastPageRaw =
            meta.last_page ??
            meta.lastPage ??
            res?.last_page ??
            res?.lastPage ??
            undefined;

          const parsedPerPage = parseInt(String(perPageRaw), 10);
          const parsedCurrentPage = parseInt(String(currentPageRaw), 10);
          const parsedTotal = parseInt(String(totalRaw), 10);
          const computedTotalPages = lastPageRaw
            ? parseInt(String(lastPageRaw), 10)
            : Math.max(
                1,
                Math.ceil(
                  (isNaN(parsedTotal) ? this.items.length : parsedTotal) /
                    (isNaN(parsedPerPage) ? this.perPage : parsedPerPage)
                )
              );

          this.perPage = isNaN(parsedPerPage) ? this.perPage : parsedPerPage;
          this.page = isNaN(parsedCurrentPage) ? this.page : parsedCurrentPage;
          this.availableCount = isNaN(parsedTotal)
            ? this.items.length
            : parsedTotal;
          this.totalPages = computedTotalPages;
        } catch {
          // fallback to mock
          const mock = await $fetch<Hotel[]>('/mock/hotels.json');
          const all = mock as Hotel[];
          this.availableCount = all.length;
          this.totalPages = Math.max(1, Math.ceil(all.length / this.perPage));
          const startIndex = (this.page - 1) * this.perPage;
          this.items = all.slice(startIndex, startIndex + this.perPage);
        }
      } catch (e: any) {
        this.error = e?.message || 'Failed to fetch hotels';
      } finally {
        this.loading = false;
      }
    },
  },
});
