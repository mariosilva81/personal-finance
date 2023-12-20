const dbConnection = require("../database/connection/index");
const bcryptjs = require("bcryptjs");

const users = {
  findByPk: (id) => {
    return dbConnection.query(
      `SELECT id, name, email FROM users WHERE id = $1;`,
      [id]
    );
  },

  findOne: (field, value) => {
    return dbConnection.query(`SELECT * FROM users WHERE ${field} = $1;`, [
      value,
    ]);
  },

  create: async (data) => {
    const { name, email, password } = data;
    const cryptedPassword = await bcryptjs.hash(password, 10);

    return dbConnection.query(
      `
        INSERT INTO users
          (name, email, password)
        VALUES
          ($1, $2, $3) 
        RETURNING *;
      `,
      [name, email, cryptedPassword]
    );
  },

  update: (data, id) => {
    const { name, email, password } = data;

    return dbConnection.query(
      `
        UPDATE users
        SET 
          name = $1, 
          email = $2, 
          password = $3
        WHERE id = $4 
        RETURNING *;
      `,
      [name, email, password, id]
    );
  },
};

module.exports = users;
