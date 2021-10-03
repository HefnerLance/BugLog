import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
// import { accountService } from '../services/AccountService'
export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('trackedbugs', this.trackedBug)
      .get('bugs/:bugid/trackedbugs', this.getUsersByTrackedBug)
  }

  // vvvvv this is prob for delete
  async trackedBug(arg0, trackedBug) {

  }

  async getTrackedBugsByUser(req, res, next) {
    try {
      const trackedBugs = await bugsService.getTrackedbugs(req.user.id)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

  async getUsersByTrackedBug(req, res, next) {
    try {
      const bugUsers = await bugsService.getBugUsers(req.user.id, req.params.id)
      res.send(bugUsers)
    } catch (error) {
      next(error)
    }
  }
}
