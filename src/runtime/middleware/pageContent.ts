import { defineNuxtRouteMiddleware } from "#app";
import { useNuxtApp, useFetch, useRuntimeConfig } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  const { baseUrl } = useRuntimeConfig().public.ecomsilver;
  const name = to.meta.id;
  const { data } = await useFetch(`${baseUrl}/pages/${name}`);
  const results = JSON.parse(data.value) ?? null;
  if (!results) return navigateTo("/", { redirectCode: 404 });
  // nuxtApp.provide('routeData', results)
  nuxtApp.routeData = results;
});
