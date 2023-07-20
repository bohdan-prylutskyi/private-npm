<template>
  <div>
    <div v-if="editState">
      <input v-model="editableValue" />
      <Button @click="editState = false">Cancel</Button>
      <Button @click="saveContent">Save</Button>
    </div>
    <div v-else>
      <p>{{ content }}</p>
      <Button v-if="$isIframe" @click="editState = true">Edit</Button>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp, ref, watch } from '#imports'
const { $isIframe } = useNuxtApp()
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['save'])

const editState = ref(false)

const editableValue = ref('')

watch(
  () => props.content,
  (newVal) => (editableValue.value = newVal),
  {
    immediate: true,
  }
)

const saveContent = () => {
  emit('save', editableValue.value)
  editState.value = false
}
</script>
