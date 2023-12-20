const {
  transactionsRepository,
  categoriesRepository,
} = require("../repositories/index");

const createTransactionService = async (payload, userId) => {
  const insertTransactionResult = await transactionsRepository.create(
    payload,
    userId
  );
  const newTransaction = insertTransactionResult.rows[0];

  return newTransaction;
};

const listTransactionsService = async (userId, queryFilter) => {
  if (Array.isArray(queryFilter)) {
    const filters = queryFilter.map((filter) => {
      return filter.toLowerCase().charAt(0).toUpperCase() + filter.slice(1);
    });

    const { rows: listTransactionResult } =
      await transactionsRepository.findAllByPk(userId);
    const { rows: categoriesList } = await categoriesRepository.findAll();
    const getCategoryFilter = categoriesList.filter((category) =>
      filters.includes(category.description)
    );

    const listTransactionsByCategory = listTransactionResult.filter(
      (transaction) => {
        return getCategoryFilter.some(
          (category) => category.id === transaction.category_id
        );
      }
    );

    return listTransactionsByCategory;
  }

  const listTransactionResult = await transactionsRepository.findAllByPk(
    userId
  );
  const transactions = listTransactionResult.rows;

  return transactions;
};

const listTransactionByIdService = async (transactionId, userId) => {
  const transactionResult = await transactionsRepository.findByPk(
    transactionId,
    userId
  );
  const transactions = transactionResult.rows[0];

  return transactions;
};

const updateTransactionService = async (payload, transactionId, userId) => {
  await transactionsRepository.update(payload, transactionId, userId);
};

const deleteTransactionService = async (transactionId, userId) => {
  await transactionsRepository.destroy(transactionId, userId);
};

const statementTransactionsService = async (userId) => {
  const transactions = await listTransactionsService(userId);

  let sumIncome = 0;
  let sumExpense = 0;

  for (const statement of transactions) {
    if (statement.type === "income") {
      sumIncome += statement.value;
    } else if (statement.type === "expense") {
      sumExpense += statement.value;
    }
  }

  const sum = {
    income: sumIncome,
    expense: sumExpense,
  };

  return sum;
};

module.exports = {
  createTransactionService,
  listTransactionsService,
  listTransactionByIdService,
  updateTransactionService,
  deleteTransactionService,
  statementTransactionsService,
};
