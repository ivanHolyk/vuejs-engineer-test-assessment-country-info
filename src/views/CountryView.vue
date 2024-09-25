<script setup>
import HolidayComponent from '@/components/HolidayComponent.vue'
import { computed, ref } from 'vue'
const props = defineProps(['country', 'id'])

const country = ref()
fetch(`https://date.nager.at/api/v3/CountryInfo/${props.id}`)
  .then((r) => r.json())
  .then((c) => (country.value = c))

const currentYear = new Date(Date.now()).getFullYear()
const activeHolidayYear = ref(currentYear)
const holidays = ref({})

const fetchHoliday = (year) =>
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${props.id}`)
    .then((r) => r.json())
    .then((h) => (holidays.value[year] = h))
fetchHoliday(currentYear)

const holidaysByYear = computed(() => holidays.value[activeHolidayYear.value])
const yearButtonHandler = (year) => {
  activeHolidayYear.value = year
  if (!holidays.value[year]) {
    fetchHoliday(year)
  }
}
</script>

<template>
  <main>
    <h3>Country: {{ country?.commonName }}</h3>

    <div style="display: inline-block">
      <button
        style="margin-right: 0.25rem; border-radius: 0.25rem"
        v-for="i in 11"
        :class="2019 + i === activeHolidayYear ? 'active' : ''"
        @click="yearButtonHandler(2019 + i)"
      >
        {{ 2019 + i }}
      </button>
    </div>
    <div>
      <div v-for="h in holidaysByYear">
        <HolidayComponent :holiday="h"></HolidayComponent>
      </div>
    </div>
  </main>
</template>
<style>
.active {
  border-color: blueviolet;
}
</style>
