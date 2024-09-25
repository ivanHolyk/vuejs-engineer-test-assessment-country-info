<script setup>
import CountryNextHoliday from '@/components/CountryNextHoliday.vue'
import { useCountryStore } from '@/stores/country'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
const countryName = ref()
const { countries } = storeToRefs(useCountryStore())

const isThereAnyCountries = computed(() =>
  countries.value && countries.value.length > 0 && countries.value[0] ? true : false
)

const filteredCountries = computed(() =>
  isThereAnyCountries.value && countryName.value
    ? countries.value.filter((country) =>
        country.name.toLowerCase().includes(countryName.value.toLowerCase())
      )
    : countries.value
)

const threeRandomCountryCode = computed(() => {
  const length = countries?.value?.length

  return length > 0 ? generateUniqueRandomIndexes(3, countries?.value?.length) : null
})

function generateUniqueRandomIndexes(runs, maxIndex) {
  let result = new Set()

  while (result.size < runs) {
    result.add(getRandomInt(0, maxIndex))
  }

  return Array.from(result)
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}
</script>

<template>
  <main class="row">
    <div class="col-3">
      <input
        class="form-control mb-3"
        v-model="countryName"
        type="text"
        placeholder="Type to search"
      />
      <div class="list-group">
        <RouterLink
          v-for="country in filteredCountries"
          :key="country.countryCode"
          class="list-group-item list-group-item-action"
          active-class="active"
          :to="`/country/${country.countryCode}`"
          >{{ country.name }}</RouterLink
        >
      </div>
    </div>
    <div class="col">
      <CountryNextHoliday
        v-for="i in threeRandomCountryCode"
        :country="countries[i]"
        class="mb-1 border rounded p-1"
      >
      </CountryNextHoliday>
    </div>
  </main>
</template>
