import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StockIngredientsTable() {
  const [stock, setStock] = useState([]);
  const [newStockItem, setNewStockItem] = useState({
    IngredientsID: "",
    Container: "",
    Quantity: "",
    Container_Size: "",
    Container_Price: "",
    Total_Quantity: "",
    Total_Price: "",
    Unit_Price: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const response = await fetch("http://localhost:5000/api/stockingredients");
    const data = await response.json();
    setStock(data);
  };

  const handleAddStockItem = async (e) => {
    e.preventDefault();
    if (!newStockItem.IngredientsID || !newStockItem.Quantity) return;

    const response = await fetch("http://localhost:5000/api/stockingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStockItem),
    });

    if (response.ok) {
      setNewStockItem({
        IngredientsID: "",
        Container: "",
        Quantity: "",
        Container_Size: "",
        Container_Price: "",
        Total_Quantity: "",
        Total_Price: "",
        Unit_Price: "",
      });
      setShowModal(false);
      fetchStock(); // refresh list
    } else {
      const errorText = await response.text(); // <-- get actual error
      console.error("Server error:", errorText);
      alert("Failed to add stock item.\n" + errorText); // show it in alert
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Stock Ingredients</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Stock Ingredient
        </button>
      </div>

      <table className="min-w-full border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">StockIngredientsID</th>
            <th className="px-4 py-2 text-left">IngredientsID</th>
            <th className="px-4 py-2 text-left">Container</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Container_Size</th>
            <th className="px-4 py-2 text-left">Container_Price</th>
            <th className="px-4 py-2 text-left">Total_Quantity</th>
            <th className="px-4 py-2 text-left">Total_Price</th>
            <th className="px-4 py-2 text-left">Unit_Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.StockIngredientsID} className="border-t">
              <td className="px-4 py-2">{item.StockIngredientsID}</td>
              <td className="px-4 py-2">{item.IngredientsID}</td>
              <td className="px-4 py-2">{item.Container}</td>
              <td className="px-4 py-2">{item.Quantity}</td>
              <td className="px-4 py-2">{item.Container_Size}</td>
              <td className="px-4 py-2">{item.Container_Price}</td>
              <td className="px-4 py-2">{item.Total_Quantity}</td>
              <td className="px-4 py-2">{item.Total_Price}</td>
              <td className="px-4 py-2">{item.Unit_Price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Stock Ingredient</h3>
            <form onSubmit={handleAddStockItem}>
              <div className="mb-4">
                <input
                  type="text"
                  value={newStockItem.IngredientsID}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      IngredientsID: e.target.value,
                    })
                  }
                  placeholder="Enter IngredientsID"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={newStockItem.Container}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Container: e.target.value,
                    })
                  }
                  placeholder="Container"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newStockItem.Quantity}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Quantity: e.target.value,
                    })
                  }
                  placeholder="Quantity"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={newStockItem.Container_Size}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Container_Size: e.target.value,
                    })
                  }
                  placeholder="Container Size"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newStockItem.Container_Price}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Container_Price: e.target.value,
                    })
                  }
                  placeholder="Container Price"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newStockItem.Total_Quantity}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Total_Quantity: e.target.value,
                    })
                  }
                  placeholder="Total Quantity"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newStockItem.Total_Price}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Total_Price: e.target.value,
                    })
                  }
                  placeholder="Total Price"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newStockItem.Unit_Price}
                  onChange={(e) =>
                    setNewStockItem({
                      ...newStockItem,
                      Unit_Price: e.target.value,
                    })
                  }
                  placeholder="Unit Price"
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
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
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

export default StockIngredientsTable;
