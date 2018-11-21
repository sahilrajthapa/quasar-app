<template>
    <div class="flex flex-center">
     <p><label>MtechId:</label>{{mtechInfo}}</p>
     <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('mtech', ['mtechInfo'])
  }
}
</script>

<style>

</style>
