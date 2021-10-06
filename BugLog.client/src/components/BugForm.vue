<template>
  <form class="bugform" @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title">title</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder="bug Name"
             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="body">Description</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="bug Description"
             v-model="editable.description"
             required
      >
      <div class="form-group">
        <label for="priority">Priority</label>
        <input type="number"
               class="form-control bg-light"
               name="body"
               placeholder="1-5"
               v-model="editable.priority"
               required
               min="0"
               max="5"
        >

        <div class="form-group">
          <button type="submit" class="btn btn-success mt-2">
            Create
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger.js'
import { bugsService } from '../services/BugsService'
import { router } from '../router'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createBug() {
        try {
          const bug = await bugsService.createBug(editable.value)
          editable.value = {}
          Pop.toast('Bug Created', 'success')
          //   route.params.push()
          router.push({ name: 'BugDetails', params: { bugId: bug.id } })
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
.bugform{
  padding: 2rem;
      width: 50%;
      margin: 0 auto;
  }

</style>
