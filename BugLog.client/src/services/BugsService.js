import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from '../services/AxiosService'
class BugsService {
  async getBugs(query = '') {
    AppState.bugs = []
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async toggleTrackedBug(bugId) {
    // const foundBug = this.getBugById(bugId)
    const res = await api.post('api/trackedbugs', bugId)
    AppState.trackedBugs.unshift(res.data)
  }

  async editBug(bugId) {
    const res = await api.put('api/bugs/' + bugId.id)
    AppState.bugs = new Bug(res.data)
  }

  async removeBug(bugId) {
    await api.delete('api/bugs/' + bugId)
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)

    AppState.bugs.unshift(res.data)
    return res.data
  }

  async getBugById(bugId) {
    const res = await api.get('api/bugs/' + bugId)
    AppState.activeBug = res.data
    this.getBugNotes(bugId)
  }

  async getBugNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
  }

  async getTrackedBugsByAccount(accountId) {
    const res = await api.get('account/trackedbugs')
    AppState.trackedBugs = res.data
  }

  async createNote(bugId, note) {
    debugger
    const res = await api.post('api/notes', note)
    AppState.notes = res.data
  }

  async createTrackedBug(bugId, accountId) {
    const res = await api.post('/api/trackedbugs', bugId)
    AppState.trackedBugs = (res.data)
  }
}
export const bugsService = new BugsService()
