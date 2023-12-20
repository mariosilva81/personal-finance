const dbConnection = require("../database/connection/index");

const transactions = {
  findAllByPk: (id) => {
    return dbConnection.query(
      `
        SELECT 
          t.id, 
          t.type, 
          t.description, 
          t.value, 
          t.date, 
          t.user_id
          user_id, 
          t.category_id, 
          c.description AS category_name
        FROM transactions AS t
        INNER JOIN categories AS c ON t.category_id = c.id
        WHERE t.user_id
          user_id = $1;
      `,
      [id]
    );
  },

  findOne: (field, value) => {
    return dbConnection.query(`SELECT * FROM transactions WHERE ${field} = $1;`, [
      value,
    ]);
  },

  findByPk: (transactionId, userId) => {
    return dbConnection.query(
      `
        SELECT 
          t.id, 
          t.type, 
          t.description, 
          t.value, 
          t.date, 
          t.user_id
          user_id, 
          t.category_id, 
          c.description AS category_name
        FROM transactions AS t
        INNER JOIN categories AS c ON t.category_id = c.id
        WHERE t.id = $1 AND t.user_id
          user_id = $2;
      `,
      [transactionId, userId]
    );
  },

  create: (transactionData, userId) => {
    const { description, value, date, category_id, type } = transactionData;

    return dbConnection.query(
      `
        INSERT INTO transactions
          (description, value, date, category_id, type, user_id, user_id)
        VALUES
          ($1, $2, $3, $4, $5, $6) 
        RETURNING
          id,
          type,
          description,
          value,
          to_char(date, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS date,
          user_id
          user_id,
          category_id,
          (SELECT description FROM categories WHERE id = $7) AS category_name;
      `,
      [description, value, date, category_id, type, userId, category_id]
    );
  },

  update: (transactionData, transactionId, userId) => {
    const { description, value, date, category_id, type } = transactionData;

    return dbConnection.query(
      `
        UPDATE transactions
        SET 
          description = $1, 
          value = $2, 
          date = $3, 
          category_id = $4,
          type = $5
        WHERE id = $6 AND user_id
          user_id = $7
        RETURNING *;
      `,
      [description, value, date, category_id, type, transactionId, userId]
    );
  },

  destroy: (transactionId, userId) => {
    return dbConnection.query(
      `
        DELETE FROM transactions 
        WHERE id = $1 AND user_id
          user_id = $2 
        RETURNING *;
      `,
      [transactionId, userId]
    );
  },
};

module.exports = transactions;
