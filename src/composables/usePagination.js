import { ref, computed } from 'vue';

export function usePagination(fetchData) {
  const currentPage = ref(1);
  const totalPages = ref(0);
  const totalItems = ref(0);
  const perPage = 5;

  const start = computed(() => (currentPage.value - 1) * perPage);
  const end = computed(() => Math.min(start.value + perPage, totalItems.value));

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchData();
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchData();
    }
  };

  const goToPage = (page) => {
    currentPage.value = page;
    fetchData();
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    start,
    end,
    prevPage,
    nextPage,
    goToPage,
  };
}
