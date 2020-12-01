<template>
  <v-app>
    <app-header />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import appHeader from '@/components/header'
export default {
  components: { appHeader }
}
</script>

<style>

</style>
