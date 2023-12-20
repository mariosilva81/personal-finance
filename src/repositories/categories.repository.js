const dbConnection = require("../database/connection/index");

const categories = {
  findAll: () => {
    return dbConnection.query(`SELECT * FROM categories;`);
  },

  findByPk: (id) => {
    return dbConnection.query(`SELECT * FROM categories WHERE id = $1;`, [id]);
  },
};

module.exports = categories;
