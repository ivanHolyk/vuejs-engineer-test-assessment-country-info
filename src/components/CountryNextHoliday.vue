<template>
  <div>
    <p>
      {{ props.country.name }}
    </p>
    <p>{{ holiday?.name }}, {{ holiday?.localName }}</p>

    <p>{{ holiday?.date }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps(['country'])

const holiday = ref()

fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${props.country.countryCode}`)
  .then((r) => r.json())
  .then((h) => (holiday.value = h[0]))
</script>
