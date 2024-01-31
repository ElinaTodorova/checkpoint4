const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (email, username, hashed_password) values (?, ?, ?)`,
      [user.email, user.username, user.hashedPassword]
    );

    return result.insertId;
  }

  async readUserByEmail(email) {
    const [rows] = await this.database.query(
      `select email from ${this.table} where email = ?`,
      [email]
    );

    return rows[0];
  }

  async readUser(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }
}

module.exports = UserManager;
