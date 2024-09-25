import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', () => {
  const countries = ref()
  const fetchCountries = () =>
    fetch(`${import.meta.env.VITE_API_URL}/AvailableCountries`)
      .then((response) => response.json())
      .then((d) => (countries.value = d))

  fetchCountries()

  const country = ref()
  const fetchCountry = (countryId) =>
    fetch(`${import.meta.env.VITE_API_URL}/CountryInfo/${countryId}`)
      .then((r) => r.json())
      .then((c) => (country.value = c))

  return { countries, fetchCountry, country }
})
