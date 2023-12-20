const {
  createTransactionService,
  listTransactionsService,
  listTransactionByIdService,
  updateTransactionService,
  deleteTransactionService,
  statementTransactionsService,
} = require("../services");

const createTransactionController = async (req, res) => {
  const { id: userId } = res.locals.decoded;
  const create = await createTransactionService(req.body, userId);
  return res.status(201).json(create);
};

const listTransactionController = async (req, res) => {
  const { id: userId } = res.locals.decoded;
  const { filter } = req.query;
  const list = await listTransactionsService(userId, filter);
  return res.status(200).json(list);
};

const listTransactionByIdController = async (req, res) => {
  const { id: transactionId } = req.params;
  const { id: userId } = res.locals.decoded;
  const list = await listTransactionByIdService(transactionId, userId);
  return res.status(200).json(list);
};

const updateTransactionController = async (req, res) => {
  const { id: userId } = res.locals.decoded;
  const { id: transactionId } = req.params;
  await updateTransactionService(req.body, transactionId, userId);
  return res.status(204).json();
};

const deleteTransactionController = async (req, res) => {
  const { id: userId } = res.locals.decoded;
  const { id: transactionId } = req.params;
  await deleteTransactionService(transactionId, userId);
  return res.status(204).json();
};

const statementTransactionController = async (_req, res) => {
  const { id: userId } = res.locals.decoded;
  const statement = await statementTransactionsService(userId);
  return res.status(200).json(statement);
};

module.exports = {
  createTransactionController,
  listTransactionController,
  listTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
  statementTransactionController,
};
