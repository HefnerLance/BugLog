<template>
  <div class="component">
    <div class="card">
      <div class="card-header">
        <span>Note creator:</span> {{ note.creator.name }}
      </div>
      <div class="card-body">
        {{ note.body }}
      </div>
      <button class="btn-danger" @click.prevent="deleteNote">
        delete Note
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {
  props: {

    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      bugsService.getBugNotes(route.params.bugId)
    })
    return {

      async deleteNote() {
        try {
          await bugsService.removeNote(props.note.id, props.note.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header span{
  font-size: 1.5rem;
}
</style>
