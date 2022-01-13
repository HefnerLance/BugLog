<template>
  <div class="BugTracked">
    <div>
      <button @click.prevent="sortByPriorityAscending">
        sort by priority ^
      </button>
      <button @click.prevent="sortByPriorityDescending">
        sort by priority V
      </button>
      <button @click.prevent="filterClosedBugs">
        Hide closed
      </button>
    </div>
    <!-- i think this thing can change bg color when the statement is truw??????      V V  v v v v vVv !-->
    <div class="card" :class="{'bg-primary': (buggy.priority> 4)}">
      <div class="card-header d-flex flex-row justify-content-around">
        <ul>
          <p>user</p>
        </ul>
        <ul>
          <router-link :to="{name: 'BugDetails', params:{bugId: buggy.id}}">
            <button type="submit">
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
          <p :class="{'bg-danger': buggy.bug.closed}">
            Status
          </p>
        </ul>
      </div>
      <ul class="list-group d-flex flex-row justify-content-around">
        <router-link :to="{name: 'Account', params:{bugId: buggy.id}}">
          <li class="list-group-item">
            <img :src="account.picture" alt="User has no picture">
          </li>
        </router-link>
        <li class="list-group-item">
          Title: {{ buggy.bug.title }}
        </li>
        <li class="list-group-item">
          Description: {{ buggy.bug.description }}
        </li>
        <li class="list-group-item">
          Priority: {{ buggy.bug.priority }}
        </li>
        <li class="list-group-item" :class="{'bg-danger': (buggy.bug.closed)}">
          Is closed:{{ buggy.bug.closed }}
        </li>
        <li class="list-group-item">
          {{ Dated }}
        </li>
        <button @click.prevent="untrackBug">
          Delete Tracked Bug
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
    buggy: { type: Object, required: true },
    account: { type: Object, required: true }

    // note: { type: Object }
  },
  setup(props) {
    // const route = useRoute()
    const form = ref({ showForm: false })
    return {
      form,
      Dated: new Date(props.buggy.updatedAt).toDateString(),
      async untrackBug() {
        // const accountId = AppState.account.id
        const bugId = props.buggy.id
        await bugsService.untrackBug(bugId)
      },
      async sortByPriorityAscending() {
        AppState.bugs.sort((a, b) => a.priority - b.priority)
      },
      async sortByPriorityDescending() {
        AppState.bugs.sort((a, b) => -a.priority - -b.priority)
      },
      async filterClosedBugs() {
        const ascending = ref(true)
        const lowFilter = ref(false)
        function lowFilterFunction(m) {
          if (lowFilter.value) {
            return m.score > 45
          }
          return true
        }
        function scoreSorter(a, b) {
          if (ascending.value) {
            return b.score - a.score
          }
          return a.score - b.score
        }
      },
      async editBug() {

      },
      bugs: computed(() => AppState.trackedbugs),
      users: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
