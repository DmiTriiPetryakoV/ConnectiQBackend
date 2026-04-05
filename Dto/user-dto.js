
class UserDto {
    constructor(model){
        this.id = model._id
        this.email = model.email
        this.name = model.name
        this.grade = model.grade
        this.stack = model.stack
        this.isActivated = model.isActivated
        this.likes = model.likes
        this.followers = model.followers
        this.following = model.following
    }
}
module.exports = UserDto