import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
// import { bugsService } from './BugsService'

class NotesService {
  async getNotes(query) {
    const notes = await dbContext.Notes.find(query).sort('-updatedAt').populate('creator', 'name picture')
    return notes
  }

  async removeNote(noteId, userid) {
    const foundNote = await this.getNoteById(noteId)
    if (userid !== foundNote.creatorId.toString()) {
      throw new Forbidden('you cannot delete a note that isnt yours')
    } await foundNote.remove()
  }

  async getNoteById(noteId) {
    const foundNote = await dbContext.Notes.findById(noteId)
    if (!foundNote) {
      throw new BadRequest('invalid note id')
    } return foundNote
  }

  async createNote(body, bugId) {
    // const foundbug = await bugsService.getBugById(bugId)
    const note = await dbContext.Notes.create(body)
    note.populate('creator', 'name picture')
    logger.log('note', note)
    return note.populate('creator', 'name picture')
  }

  async getBugNotes(bugId) {
    const foundBugnotes = await dbContext.Notes.find({ bugId }).sort('notes').populate('creator', 'name picture')
    if (!foundBugnotes) {
      throw new BadRequest('invalid bug id')
    } return foundBugnotes
  }
}
export const notesService = new NotesService()
