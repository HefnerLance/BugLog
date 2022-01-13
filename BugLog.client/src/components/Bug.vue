<template>
  <div class="bug-component">
    <div>
      <button @click.prevent="sortByPriorityAscending">
        sort by priority ^
      </button>
      <button @click.prevent="sortByPriorityDescending">
        sort by priority V
      </button>
      <button @click.prevent="filterClosedBugs">
        sort closed
      </button>
      <button @click.prevent="filterClosedAscending">
        sort closed
      </button>
    </div>
    <!-- i think this thing can change bg color when the statement is true??????      V V  v v v v vVv !-->
    <div class="card" :class="{'bg-primary': (bug.priority> 4)}">
      <div class="card-header d-flex flex-row justify-content-around">
        <ul>
          <p>user</p>
        </ul>
        <ul>
          <router-link :to="{name: 'BugDetails', params:{bugId: bug.id}}">
            <button type="submit selectable">
              More details
            </button>
          </router-link>
        </ul>
        <ul>
          <!-- this thing makes bg blue -->
          <p>
            Description
          </p>
        </ul>
        <ul>
          <p>Priority</p>
        </ul>
        <ul>
          <p :class="{'bg-danger': bug.closed}">
            Status
          </p>
        </ul>
      </div>
      <ul class="list-group d-flex flex-row justify-content-around">
        <router-link :to="{name: 'Account', params:{bugId: bug.id}}">
          <li class="list-group-item">
            <img :src="account.picture" alt="User has no picture">
            <h5>{{ bug.creator.name }}</h5>
          </li>
        </router-link>
        <li class="list-group-item">
          Title: {{ bug.title }}
        </li>
        <li class="list-group-item">
          Description {{ bug.description }}
        </li>
        <li class="list-group-item">
          Priority: {{ bug.priority }}
        </li>
        <li class="list-group-item" :class="{'bg-danger': (bug.closed)}">
          Is closed:{{ bug.closed }}
        </li>
        <li class="list-group-item">
          {{ bug.updatedAt }}
        </li>
        <button @click="createTrackedBug(bug.id)">
          Track this Bug
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
export default {
  props: {
    bug: { type: Object, required: true },
    account: { type: Object, required: true }

    // note: { type: Object }
  },
  setup(props) {
    // const route = useRoute()
    const form = ref({ showForm: false })
    return {
      form,
      async createTrackedBug(id) {
        await bugsService.createTrackedBug(id)
      },
      async sortByPriorityAscending() {
        AppState.bugs.sort((a, b) => a.priority - b.priority)
      },
      async sortByPriorityDescending() {
        AppState.bugs.sort((a, b) => -a.priority - -b.priority)
      },
      async filterClosedAscending() {
        AppState.bugs.sort((a, b) => a.closed - b.closed)
      },
      async filterClosedBugs() {
        AppState.bugs.sort((a, b) => -a.closed - -b.closed)
      },
      async editBug() {

      },
      bugs: computed(() => AppState.bugs),
      users: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
