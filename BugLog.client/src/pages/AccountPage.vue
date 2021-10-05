<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <Bug v-for="b in bugs" :key="b.id" :bug="b" />
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
export default {
  name: 'Account',
  props: {

  },
  setup() {
    // const route = useRoute()
    onMounted(async() => {
      try {
        const accountId = AppState.account
        await bugsService.getTrackedBugsByAccount()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.trackedBugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
