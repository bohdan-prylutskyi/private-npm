<template>
  <div>
    <Sortable :list="routeData.content" item-key="name">
      <template #item="{ element }">
        <div>
          <component :is="element.component" v-bind="element" />
        </div>
      </template>
    </Sortable>
  </div>
</template>

<script setup>
import { Sortable } from "sortablejs-vue3";
import { useNuxtApp, useHead, definePageMeta } from "#imports";
const { routeData } = useNuxtApp();
useHead(routeData);
</script>
