<template>
  <div class="component">
    <div class="card">
      {{ }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'

export default {

  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      bugsService.getBugById(route.params.bugId)
    })
    return {
      activeBug: computed(() => AppState.activeBug)
    }
  }
}
</script>s

<style lang="scss" scoped>

</style>
