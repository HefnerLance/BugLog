import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
// import { notesService } from './NotesService'

class BugsService {
  async deleteTrackedBug(bugId, userId) {
    const bugToDelete = await this.getTrackedBug(bugId)
    if (userId !== bugToDelete.accountId.toString()) {
      throw new Forbidden('you cannot delete this')
    }
    const deletedBug = await dbContext.TrackedBugs.findOneAndDelete({ bugId: bugId, accountId: userId })
    await dbContext.TrackedBugs.remove(deletedBug, bugToDelete)
  }

  async getTrackedbugs(userid) {
    const trackedbugs = await dbContext.TrackedBugs.find({ accountId: userid }).sort('-bug').populate('tracker', 'name picture').populate('bug')
    return trackedbugs
  }

  // fantasy hand egg for how to stop user from tracking twice
  async createTrackedBug(body) {
    // const checkfortrackedbug = await this.getTrackedbugs(body.accountId)
    // FIXME commented line 25
    const newbug = await dbContext.TrackedBugs.create(body)
    // await newbug.populate('creator', 'name picture')
    await newbug.populate('bug', 'id')
    await newbug.populate('tracker', 'name picture')
    return newbug
  }

  async getTrackedBug(bugId) {
    const trackedBug = await dbContext.TrackedBugs.findById(bugId)
    trackedBug.populate('creator', 'name picture')
    trackedBug.populate('bug', 'id')
    trackedBug.populate('tracker', 'name picture')
    return trackedBug
  }

  async getBugUsers(userId, bugId) {
    const foundUsers = await dbContext.TrackedBugs.find({ bugId: bugId }).sort('-tracker').populate('tracker', 'name picture')
    return foundUsers
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

  // FIXME something is wrong with the if statement or i am not getting the id through properly
  async editBug(bugId, userId, body) {
    const bug = await this.getBugById(bugId)
    const bugCreatorId = bug.creatorId.toString()
    if (userId !== bugCreatorId) {
      throw new Forbidden('you cannot edit this bug')
    }
    if (bug.closed === true) {
      throw new Forbidden('this bug is closed')
    }
    bug.title = body.title || bug.title
    bug.description = body.description || bug.description
    bug.closed = body.closed || bug.closed
    await bug.save()
    return bug
  }

  async removeBug(bugId, userid, body) {
    const bug = await this.getBugById(bugId)
    if (userid !== bug.creatorId.toString() || bug.closed !== false) {
      throw new Forbidden('this bug is closed')
    }

    bug.closed = true
    await bug.save()
    return bug
  }
}
export const bugsService = new BugsService()
