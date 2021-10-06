
<template>
  <form @submit.prevent="createnote()">
    <div class="form-group">
      <label for="body">body</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="note contents"
             v-model="editable.body"
             required
      >
      <button type="submit" class="btn btn-success mt-2">
        Create
      </button>
    </div>
  </form>
</template>
<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger.js'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createnote() {
        try {
          editable.value.bugId = route.params.bugId
          await bugsService.createNote(editable.value)
          editable.value = {}
          Pop.toast('note Created', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>
</style>
