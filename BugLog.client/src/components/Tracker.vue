<template>
  <div class="component">
    <div class="card">
      <div class="card-header">
        <img :src="tracker.tracker.picture" alt="">
      </div>
      <div class="card-body">
        {{ tracker.tracker.name }}
      </div>
      <!-- {{ tracker.tracker.picture }} -->
      <!-- {{ tracker.tracker.picture }} -->
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    tracker: { type: Object, required: true }
  },
  setup(props) {
    return {
      trackers: computed(() => AppState.trackers)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
