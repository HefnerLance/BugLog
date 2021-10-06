<template>
  <div class="bug-detailed">
    <div class="card">
      <div class="card-header d-flex justify-content-around align-items-center">
        <router-link :to="{ name: 'Account' }">
          <img :src="account.picture" alt="">
          <p>{{ account.name }} </p>
        </router-link>
        <button v-if=" bug.creatorId == account.id && bug.closed == false " @click="form.showForm = !form.showForm">
          showform
        </button>
        <NoteForm />
        <div v-if="form.showForm">
          <BugEditForm />
        </div>
      </div>
      <div class="card-body ">
        <ul class=" d-flex flex-row justify-content-between">
          <li>
            priority: {{ bug.priority }}
          </li>
          <li>
            closed: {{ bug.closed }}
            <button @click="deleteBug()" class="btn btn-primary">
              close Bug
            </button>
          </li>
          <li>
            description: {{ bug.description }}
          </li>
          <li>
            <button @click="createNote()" class="btn btn-secondary">
              create note
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Note v-for="n in notes" :key="n.id" :note="n" />
  <Tracker v-for="t in trackers" :key="t.id" :tracker="t" />
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
// import { applyStyles } from '@popperjs/core'
export default {
  setup() {
    const route = useRoute()
    const form = ref({ showForm: false })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
        await bugsService.getTrackers(route.params.bugId)
        await bugsService.getBugNotes(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      form,
      route,

      bug: computed(() => AppState.activeBug),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      trackers: computed(() => AppState.trackers),

      async createNote() {
        try {
          await bugsService.createNote(route.params.bugId)
        } catch (error) {
          logger.log(error)
        }
      },
      async deleteBug() {
        try {
          await bugsService.removeBug(route.params.bugId)
        } catch (error) {
          logger.log(error)
        }
      },
      async deleteNote() {
        try {
          await bugsService.removeNote(route.params.bugId)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
