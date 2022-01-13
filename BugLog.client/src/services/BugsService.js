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

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
    this.getBugNotes(id)
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
    await api.post('api/notes', note)

    this.getBugNotes(note.bugId)
  }

  async removeNote(noteId, bugId) {
    const res = await api.delete('api/notes/' + noteId)
    this.getBugNotes(bugId)

    return res
  }

  async createTrackedBug(id) {
    const res = await api.post('/api/trackedbugs', { bugId: id })
    AppState.trackedBugs.push(res.data)
  }

  async getTrackers(bugid) {
    const res = await api.get('api/bugs/' + bugid + '/trackedbugs')
    AppState.trackers = res.data
    logger.log(res, 'getting trackers')
  }

  async untrackBug(bugId) {
    const res = await api.delete('api/trackedbugs/' + bugId)
    AppState.trackedBugs.unshift(res.data)
  }
}
export const bugsService = new BugsService()
