<script setup>
import CountryNextHoliday from '@/components/CountryNextHoliday.vue'
import { computed, ref } from 'vue'
const countryName = ref()
const countries = ref()
// setTimeout(()=>
fetch('https://date.nager.at/api/v3/AvailableCountries')
  .then((response) => response.json())
  .then((d) => (countries.value = d))
// ,3000)
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

const countriesLenght = computed(() => countries?.value?.length)

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
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
</script>

<template>
  <main>
    <div style="width: fit-content; float: left; margin-right: 1rem">
      <input v-model="countryName" type="text" placeholder="Type to search" />
      <div v-for="country in filteredCountries" :key="country.countryCode">
        <RouterLink :to="`/country/${country.countryCode}`">{{ country.name }}</RouterLink>
      </div>
    </div>
    <div>
      <CountryNextHoliday v-for="i in threeRandomCountryCode" :country="countries[i]">
      </CountryNextHoliday>
    </div>
  </main>
</template>
