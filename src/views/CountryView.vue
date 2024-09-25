<script setup>
import HolidayComponent from '@/components/HolidayComponent.vue'
import { useCountryStore } from '@/stores/country'
import { useHolidayStore } from '@/stores/holiday'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
const props = defineProps(['country', 'id'])

useCountryStore().fetchCountry(props.id)
const { country } = storeToRefs(useCountryStore())

const currentYear = new Date(Date.now()).getFullYear()
const activeHolidayYear = ref(currentYear)

const { holidays } = storeToRefs(useHolidayStore())
const holidayStore = useHolidayStore()
holidayStore.fetchHoliday(currentYear, props.id)

const holidaysByYear = computed(() =>
  holidays?.value ? holidays.value[activeHolidayYear.value] : []
)

const yearButtonHandler = (year) => {
  activeHolidayYear.value = year
  if (!holidays.value[year]) {
    holidayStore.fetchHoliday(year, props.id)
  }
}
</script>

<template>
  <main>
    <h3>Country: {{ country?.commonName }}</h3>

    <div class="mb-1 d-inline-block">
      <button
        class="btn btn-outline-secondary me-1"
        v-for="i in 11"
        :class="2019 + i === activeHolidayYear ? 'active' : ''"
        @click="yearButtonHandler(2019 + i)"
      >
        {{ 2019 + i }}
      </button>
    </div>
    <div>
      <div v-for="h in holidaysByYear" class="border rounded mb-1">
        <HolidayComponent :holiday="h"></HolidayComponent>
      </div>
    </div>
  </main>
</template>
