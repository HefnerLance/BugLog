import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
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
