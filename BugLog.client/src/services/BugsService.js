import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from '../services/AxiosService'
class BugsService {
  async getBugs(query = '') {
    AppState.bugs = []
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
  }
}
export const bugsService = new BugsService()
