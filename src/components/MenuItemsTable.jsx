import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    Menu: "",
    SellingPrice: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const response = await fetch("/api/menu-items");
    const data = await response.json();
    setMenuItems(data);
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.Menu || !newMenuItem.SellingPrice) return;

    const response = await fetch("/api/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuItem),
    });

    if (response.ok) {
      setNewMenuItem({ Menu: "", SellingPrice: "" });
      setShowModal(false);
      fetchMenuItems(); // refresh list
    } else {
      alert("Failed to add menu item.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Menu Items</h2>
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
          + Add Menu Item
        </button>
      </div>

      <table className="min-w-full border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">MenuID</th>
            <th className="px-4 py-2 text-left">Menu</th>
            <th className="px-4 py-2 text-left">Selling Price</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.MenuID} className="border-t">
              <td className="px-4 py-2">{item.MenuID}</td>
              <td className="px-4 py-2">{item.Menu}</td>
              <td className="px-4 py-2">{item.SellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Menu Item</h3>
            <form onSubmit={handleAddMenuItem}>
              <div className="mb-4">
                <input
                  type="text"
                  value={newMenuItem.Menu}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, Menu: e.target.value })
                  }
                  placeholder="Enter Menu Name"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newMenuItem.SellingPrice}
                  onChange={(e) =>
                    setNewMenuItem({
                      ...newMenuItem,
                      SellingPrice: e.target.value,
                    })
                  }
                  placeholder="Selling Price"
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

export default MenuItemsTable;
