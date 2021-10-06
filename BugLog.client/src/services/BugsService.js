import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from '../services/AxiosService'
import { logger } from '../utils/Logger'
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

  async editBug(body, bugId) {
    debugger
    const res = await api.put('api/bugs/' + bugId, body)
    AppState.bugs = (res.data)
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
    debugger
    AppState.activeBug = res.data
    this.getBugNotes(bugId)
  }

  async getBugNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
  }

  async getTrackedBugsByAccount() {
    const res = await api.get('account/trackedbugs')
    logger.log(res)
    AppState.trackedBugs = res.data
  }

  async createNote(note) {
    const res = await api.post('api/notes', note)
    AppState.notes = res.data
  }

  async removeNote(noteId) {
    const res = await api.delete('api/notes/' + noteId)
    AppState.notes = res.data
  }

  async createTrackedBug(body) {
    const res = await api.post('/api/trackedbugs', body)
    AppState.trackedBugs = (res.data)
  }

  async getTrackers(bugid) {
    const res = await api.get('api/bugs/' + bugid + '/trackedbugs')
    AppState.trackers = res.data
    logger.log(res, 'getting trackers')
  }

  async untrackBug(bugId) {
    const res = await api.delete('api/trackedbugs/' + bugId)
    AppState.trackedBugs = res.data
  }
}
export const bugsService = new BugsService()
