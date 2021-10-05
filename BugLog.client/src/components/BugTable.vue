<template>
  <div></div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      bugs: computed(() => AppState.bugs),
      users: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
