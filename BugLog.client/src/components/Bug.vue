<template>
  <div class="bug-component">
    <div>
      <button @click.prevent="sortByPriorityAscending">
        sort by priority ^
      </button>
      <button @click.prevent="sortByPriorityDescending">
        sort by priority V
      </button>
    </div>
    <div class="card">
      <div class="card-header d-flex flex-row justify-content-around">
        <ul>
          <p>user</p>
        </ul>
        <ul>
          <router-link :to="{name: 'BugDetails', params:{bugId: bug.id}}">
            <button type="submit">
              More details
            </button>
          </router-link>
        </ul>
        <ul>
          <p :class="{'bg-primary': bug.closed}">
            Description
          </p>
        </ul>
        <ul>
          <p>Priority</p>
        </ul>
        <ul>
          <p>Status</p>
        </ul>
      </div>
      <ul class="list-group d-flex flex-row justify-content-around">
        <router-link :to="{name: 'Account', params:{bugId: bug.id}}">
          <li class="list-group-item">
            <img :src="bug.creator.picture" alt="User has no picture">
          </li>
        </router-link>
        <li class="list-group-item">
          {{ bug.title }}
        </li>
        <li class="list-group-item">
          {{ bug.description }}
        </li>
        <li class="list-group-item">
          {{ bug.priority }}
        </li>
        <li class="list-group-item">
          {{ bug.closed }}
        </li>
        <li class="list-group-item">
          {{ bug.updatedAt }}
        </li>
        <button @click.prevent="createTrackedBug">
          Track this Bug
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  props: {
    bug: { type: Object, required: true }
    // note: { type: Object }
  },
  setup(props) {
    return {
      async createTrackedBug() {
        await bugsService.createTrackedBug()
      },
      async sortByPriorityAscending() {
        AppState.bugs.sort((a, b) => a.priority - b.priority)
      },
      async sortByPriorityDescending() {
        AppState.bugs.sort((a, b) => -a.priority - -b.priority)
      },
      bugs: computed(() => AppState.bugs),
      users: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
