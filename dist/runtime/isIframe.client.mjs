import { defineNuxtPlugin } from "#app";
import { computed } from "#imports";
export default defineNuxtPlugin(() => {
  const isIframe = computed(() => window.self !== window.top);
  return {
    provide: {
      isIframe
    }
  };
});
