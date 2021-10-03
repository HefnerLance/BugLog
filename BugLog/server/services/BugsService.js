import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
// import { notesService } from './NotesService'

class BugsService {
  async getBugUsers(userId, bugId) {
    const foundUsers = await dbContext.TrackedBugs.find({ bugId }).sort('-tracker').populate('tracker', 'name picture')
    return foundUsers
  }

  async getTrackedbugs(userid) {
    const trackedbugs = await dbContext.TrackedBugs.find({ userid }).sort('-bug').populate('creator', 'name picture')
    return trackedbugs
  }

  async getBugNotes(bugId) {
    const foundBugnotes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture')
    if (!foundBugnotes) {
      throw new BadRequest('invalid bug id')
    } return foundBugnotes.filter(n => n.bugId !== bugId)
  }

  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator', 'name picture')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('invalid bug id')
    }
    return bug
  }

  async createBug(body) {
    const bug = await dbContext.Bugs.create(body)
    return bug.populate('creator', 'name picture')
  }

  async editBug(bugId, userid, body) {
    const bug = await this.getBugById(bugId)
    if (userid !== bug.creatorId.toString() || bug.closed !== false) {
      throw new Forbidden('you cannot edit this bug')
    }
    bug.title = body.title || bug.title
    bug.description = body.description || bug.description
    bug.closed = body.closed || bug.closed
    await bug.save()
    return bug
  }

  async removeBug(bugId, userid, body) {
    const bug = await this.getBugById(bugId)
    if (userid !== bug.creatorId.toString() && bug.closed !== false) {
      throw new Forbidden('this bug is closed')
    }

    bug.closed = true
    await bug.save()
    return bug
  }
}
export const bugsService = new BugsService()
