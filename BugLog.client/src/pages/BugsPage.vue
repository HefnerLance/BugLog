<template>
  <div class="component">
    <p>BugsPage</p>
    <BugTable v-for="b in bugs" :key="b.id" :bug="b" />
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
export default {

  setup() {
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
