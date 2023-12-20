const express = require("express");
const transactionsRouter = express.Router();
const {
  verifyToken,
  verifyCategory,
  verifyTransaction,
  verifyFields,
} = require("../middlewares/index");
const {
  createTransactionController,
  listTransactionController,
  listTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
  statementTransactionController,
} = require("../controllers/index");

transactionsRouter.post(
  "/",
  verifyToken,
  verifyFields,
  verifyCategory,
  createTransactionController
);

transactionsRouter.get("/", verifyToken, listTransactionController);

transactionsRouter.get("/statement", verifyToken, statementTransactionController);

transactionsRouter.get(
  "/:id",
  verifyToken,
  verifyTransaction,
  listTransactionByIdController
);

transactionsRouter.put(
  "/:id",
  verifyToken,
  verifyFields,
  verifyTransaction,
  verifyCategory,
  updateTransactionController
);

transactionsRouter.delete(
  "/:id",
  verifyToken,
  verifyTransaction,
  deleteTransactionController
);

module.exports = transactionsRouter;
