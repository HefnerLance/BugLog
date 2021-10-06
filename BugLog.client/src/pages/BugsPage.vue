<template>
  <div class="component">
    <p>BugsPage</p>
    <Bug v-for="b in bugs" :key="b.id" :bug="b" :account="account" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
export default {

  setup() {
    onMounted(async() => {
      bugsService.getBugs()
    })

    return {

      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
