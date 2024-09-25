<template>
  <div>
    <p>
      <RouterLink :to="`/country/${props.country.countryCode}`">
        {{ props.country.name }}
      </RouterLink>
    </p>
    <HolidayComponent v-if="holiday" :holiday="holiday"></HolidayComponent>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import HolidayComponent from './HolidayComponent.vue'

const props = defineProps(['country'])

const holiday = ref()

fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${props.country.countryCode}`)
  .then((r) => r.json())
  .then((h) => (holiday.value = h[0]))
</script>
