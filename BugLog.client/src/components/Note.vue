<template>
  <div class="component">
    <div class="card">
      <div class="card-header">
        Note creator: {{ note.creator.name }}

        <div class="card-body">
          {{ note.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
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
      notes: computed(() => AppState.notes)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
