import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHolidayStore = defineStore('holiday', () => {
  const holidays = ref({})

  const fetchHoliday = (year, countryId) =>
    fetch(`${import.meta.env.VITE_API_URL}/PublicHolidays/${year}/${countryId}`)
      .then((r) => r.json())
      .then((h) => (holidays.value[year] = h))

  return { holidays, fetchHoliday }
})
