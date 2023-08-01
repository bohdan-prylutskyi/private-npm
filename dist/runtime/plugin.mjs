import { defineNuxtPlugin } from "#app";
import { useRouter, useFetch, useRuntimeConfig } from "#imports";
export default defineNuxtPlugin(async (nuxtApp) => {
  const router = useRouter();
  const { baseUrl } = useRuntimeConfig().public.ecomsilver;
  const { data } = await useFetch(`${baseUrl}/pages`);
  const pages = data?.value || [];
  pages.forEach((page) => {
    if (page) {
      router.addRoute({
        name: page.name,
        path: page.path,
        meta: {
          id: page.id,
          middleware: "pageContent",
          parent: page.parent.id
        },
        component: () => import("./page.vue")
      });
    }
  });
});
