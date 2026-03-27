module.exports = class UserDto {
    id;
    createdAt;
    nickname;
    email;
    role;
    avatarUrl;
    kind;
    username;

    constructor(model) {
        this.id = model.id
        this.createdAt = model.createdAt
        this.nickname = model.nickname
        this.email = model.email
        this.role = model.role
        this.avatarUrl = model.avatarUrl
        this.kind = model.kind
        this.username = model.username
    }
}