import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
// import { accountService } from '../services/AccountService'
// import { accountService } from '../services/AccountService'
export class TrackedBugsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/trackedbugs', this.createTrackedBug)
      .get('/bugs/:bugid/trackedbugs', this.getUsersByTrackedBug)
      .get('/trackedbugs', this.trackedBug)
      .delete('/trackedbugs/:trackedbugid', this.deleteTrackedBug)
  }

  async deleteTrackedBug(req, res, next) {
    try {
      const deletedBug = await bugsService.deleteTrackedBug(req.params.trackedbugid, req.userInfo.id)
      res.send(deletedBug)
    } catch (error) {
      next(error)
    }
  }

  // vvvvv this is prob for delete
  async trackedBug(req, res, next) {
    try {
      const trackedBug = await bugsService.getTrackedBug(req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
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
      const bugUsers = await bugsService.getBugUsers(req.user.id, req.params.bugid)
      res.send(bugUsers)
    } catch (error) {
      next(error)
    }
  }

  async createTrackedBug(req, res, next) {
    try {
      const newTrackedBug = await bugsService.createTrackedBug(req.body)
      res.send(newTrackedBug)
    } catch (error) {
      next(error)
    }
  }
}
