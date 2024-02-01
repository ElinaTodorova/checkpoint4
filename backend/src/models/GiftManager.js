const AbstractManager = require("./AbstractManager");

class GiftManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "gift" as configuration
    super({ table: "gift" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  // The C of CRUD - Create operation

  async create(gift) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name_gift, description_gift, age_min, image_url, user_id) values (?, ?, ? , ?, ?)`,
      [gift.name, gift.description, gift.ageMin, gift.imageUrl, gift.userId]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async update(id, gift) {
    const [result] = await this.database.query(
      `update ${this.table} set name_gift = ?, description_gift = ? , age_min = ? where id = ?`,
      [gift.name, gift.description, gift.ageMin, Number(id)]
    );

    return result;
  }

  async deleteGift(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = GiftManager;
