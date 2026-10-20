
const orders = [];

function addOrder(order) {
  orders.push(order);
  return order;
}

function getAllOrders() {
  return orders;
}

function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

function deleteOrder(id) {
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    return false;
  }

  orders.splice(index, 1);
  return true;
}

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};
