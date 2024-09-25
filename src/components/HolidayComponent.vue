<template>
  {{ props.holiday.name }}, {{ props.holiday.localName }}
  <br />
  {{ props.holiday.date }}
  <br />
  <span v-for="type in props.holiday.types" class="badge text-bg-secondary">{{ type }}</span>
</template>

<script setup>
const props = defineProps(['holiday'])
</script>
