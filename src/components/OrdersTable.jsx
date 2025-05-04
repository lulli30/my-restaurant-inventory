import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    MenuID: "",
    Quantity: "",
    TotalPrice: "",
    OrderDate: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data);
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    if (
      !newOrder.MenuID ||
      !newOrder.Quantity ||
      !newOrder.TotalPrice ||
      !newOrder.OrderDate
    )
      return;

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (response.ok) {
      setNewOrder({
        MenuID: "",
        Quantity: "",
        TotalPrice: "",
        OrderDate: "",
      });
      setShowModal(false);
      fetchOrders(); // refresh list
    } else {
      alert("Failed to add order.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Orders</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Order
        </button>
      </div>

      <table className="min-w-full border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">OrderID</th>
            <th className="px-4 py-2 text-left">MenuID</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Total Price</th>
            <th className="px-4 py-2 text-left">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderID} className="border-t">
              <td className="px-4 py-2">{order.OrderID}</td>
              <td className="px-4 py-2">{order.MenuID}</td>
              <td className="px-4 py-2">{order.Quantity}</td>
              <td className="px-4 py-2">{order.TotalPrice}</td>
              <td className="px-4 py-2">
                {new Date(order.OrderDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Order</h3>
            <form onSubmit={handleAddOrder}>
              <div className="mb-4">
                <input
                  type="text"
                  value={newOrder.MenuID}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, MenuID: e.target.value })
                  }
                  placeholder="Enter MenuID"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newOrder.Quantity}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, Quantity: e.target.value })
                  }
                  placeholder="Enter Quantity"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newOrder.TotalPrice}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, TotalPrice: e.target.value })
                  }
                  placeholder="Enter Total Price"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="datetime-local"
                  value={newOrder.OrderDate}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, OrderDate: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
