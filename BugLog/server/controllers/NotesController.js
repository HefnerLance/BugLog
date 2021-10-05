import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getNotes)
      // .get('bugs/:bugId/notes', this.getBugNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes(req.query)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getBugNotes(req, res, next) {
    try {
      const bugNotes = await bugsService.getBugNotes(req.params.bugId)
      res.send(bugNotes)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body, req.params.bugId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const deletedNote = await notesService.removeNote(req.params.noteId, req.userInfo.id)
      res.send(deletedNote)
    } catch (error) {
      next(error)
    }
  }
}
