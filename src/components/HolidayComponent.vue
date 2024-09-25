<template>
  {{ props.holiday.name }}, {{ props.holiday.localName }}
  <br />
  {{ props.holiday.date }}
</template>

<script setup>
const props = defineProps(['holiday'])
</script>
