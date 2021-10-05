<template>
  <div class="bug-detailed">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <router-link :to="{ name: 'Account' }">
          <img :src="account.picture" alt="">
        </router-link>
        <NoteForm />
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
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
      try {
        await bugsService.getBugNotes(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
      try {
        await bugsService.editBug(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      bug: computed(() => AppState.activeBug),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      async createNote() {
        try {
          await bugsService.createNote(route.params.bugId)
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
