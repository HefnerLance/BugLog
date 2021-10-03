<template>
  <div class="BugTable">
    <div class="bugs">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              First
            </th>
            <th scope="col">
              Last
            </th>
            <th scope="col">
              Closed
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              1
            </th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">
              2
            </th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">
              3
            </th>
            <td colspan="2">
              Larry the Bird
            </td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      bugs: computed(() => AppState.bugs),
      users: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
