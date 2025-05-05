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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/stockingredients"
      );
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error("Failed to fetch stock ingredients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStockItem = async (e) => {
    e.preventDefault();
    if (!newStockItem.IngredientsID || !newStockItem.Quantity) {
      alert("Ingredients ID and Quantity are required.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/stockingredients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStockItem),
        }
      );

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
        const errorText = await response.text();
        console.error("Server error:", errorText);
        alert("Failed to add stock item.\n" + errorText);
      }
    } catch (error) {
      console.error("Error adding stock item:", error);
      alert("Error adding stock item: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Stock Ingredients
          </h2>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center shadow-sm"
            onClick={() => navigate("/")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="mb-6">
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-md transition duration-300 ease-in-out flex items-center shadow-sm"
            onClick={() => setShowModal(true)}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Stock Ingredient
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading stock ingredients...</p>
          </div>
        ) : stock.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            <p className="mt-2 text-gray-500">No stock ingredients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ingredient ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Container
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Container Size
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Container Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Unit Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stock.map((item) => (
                  <tr
                    key={item.StockIngredientsID}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.StockIngredientsID}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.IngredientsID}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Container}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Container_Size}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Container_Price}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Total_Quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Total_Price}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {item.Unit_Price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Add New Stock Ingredient
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddStockItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ingredientsId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ingredient ID*
                  </label>
                  <input
                    id="ingredientsId"
                    type="text"
                    value={newStockItem.IngredientsID}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        IngredientsID: e.target.value,
                      })
                    }
                    placeholder="Enter ID"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label
                    htmlFor="container"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Container
                  </label>
                  <input
                    id="container"
                    type="text"
                    value={newStockItem.Container}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Container: e.target.value,
                      })
                    }
                    placeholder="Container type"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity*
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    value={newStockItem.Quantity}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Quantity: e.target.value,
                      })
                    }
                    placeholder="Enter quantity"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="containerSize"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Container Size
                  </label>
                  <input
                    id="containerSize"
                    type="text"
                    value={newStockItem.Container_Size}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Container_Size: e.target.value,
                      })
                    }
                    placeholder="Size per container"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="containerPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Container Price
                  </label>
                  <input
                    id="containerPrice"
                    type="number"
                    step="0.01"
                    value={newStockItem.Container_Price}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Container_Price: e.target.value,
                      })
                    }
                    placeholder="Price per container"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="totalQuantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Quantity
                  </label>
                  <input
                    id="totalQuantity"
                    type="number"
                    step="0.01"
                    value={newStockItem.Total_Quantity}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Total_Quantity: e.target.value,
                      })
                    }
                    placeholder="Total quantity"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="totalPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Price
                  </label>
                  <input
                    id="totalPrice"
                    type="number"
                    step="0.01"
                    value={newStockItem.Total_Price}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Total_Price: e.target.value,
                      })
                    }
                    placeholder="Total price"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="unitPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Unit Price
                  </label>
                  <input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={newStockItem.Unit_Price}
                    onChange={(e) =>
                      setNewStockItem({
                        ...newStockItem,
                        Unit_Price: e.target.value,
                      })
                    }
                    placeholder="Price per unit"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors duration-300 shadow-sm"
                >
                  Add Stock Item
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
