
const express = require("express");
const service = require("./service");

const router = express.Router();

function validationProblem(message, details) {
  return {
    error: {
      code: "VALIDATION_ERROR",
      message,
      details,
    },
  };
}

function notFoundProblem() {
  return {
    error: {
      code: "ORDER_NOT_FOUND",
      message: "Order not found",
    },
  };
}

router.post("/orders", (req, res) => {
  const validationErrors = service.validateCreateOrder(req.body);

  if (validationErrors.length > 0) {
    return res
      .status(400)
      .json(validationProblem("Invalid order", validationErrors));
  }

  const order = service.createOrder(req.body);

  return res
    .status(201)
    .location(`/orders/${order.id}`)
    .json(service.orderResponse(order));
});

router.get("/orders", (req, res) => {
  const orders = service.getAllOrders();

  return res.status(200).json({
    orders,
    count: orders.length,
  });
});

router.get("/orders/:id", (req, res) => {
  const order = service.getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json(notFoundProblem());
  }

  return res.status(200).json(service.orderResponse(order));
});

router.delete("/orders/:id", (req, res) => {
  const deleted = service.deleteOrder(req.params.id);

  if (!deleted) {
    return res.status(404).json(notFoundProblem());
  }

  return res.status(204).send();
});

module.exports = router;
