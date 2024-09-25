<script setup>
import { computed, ref } from 'vue'
const props = defineProps(['country', 'id'])

const country = ref()
fetch(`https://date.nager.at/api/v3/CountryInfo/${props.id}`)
  .then((r) => r.json())
  .then((c) => (country.value = c))
</script>

<template>
  <main>
    {{ props.id }}
    <hr />
 Country:   {{ country.commonName }}
  </main>
</template>
