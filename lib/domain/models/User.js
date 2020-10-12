module.exports = class User {
  constructor({ username, password, role = 'default' }) {
    this.username = username
    this.password = password
    this.role = role
  }
}
