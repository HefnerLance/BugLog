import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger.js'
import { bugsService } from '../services/BugsService.js'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.removeBug)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
      logger.log(error, ' get bugs')
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.bugId)
      res.send(bug)
    } catch (error) {
      next(error)
      logger.log(error, ' getbugsbyid')
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
      logger.log(error, 'createBug')
    }
  }

  async editBug(req, res, next) {
    try {
      const editedbug = await bugsService.editBug(req.params.bugId, req.userInfo.id, req.body)
      res.send(editedbug)
    } catch (error) {
      next(error)
      logger.log(error, '')
    }
  }

  async removeBug(req, res, next) {
    try {
      // FIXME maybe want to consider adding req.body because delete is really an edit??
      const deletedbug = await bugsService.removeBug(req.params.bugId, req.userInfo.id, req.body)
      res.send(deletedbug)
    } catch (error) {
      next(error)
      logger.log(error, '')
    }
  }
}
