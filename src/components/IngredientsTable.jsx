import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IngredientsTable() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    IngredientName: "",
    UnitOfMeasurement: "",
    CategoryID: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ingredients");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
    }
  };

  const handleAddIngredient = async (e) => {
    e.preventDefault();

    // Validate the input
    if (!newIngredient.IngredientName.trim()) {
      alert("Ingredient Name is required.");
      return;
    }

    if (!newIngredient.CategoryID || isNaN(newIngredient.CategoryID)) {
      alert("Please enter a valid Category ID.");
      return;
    }

    const ingredientToAdd = { ...newIngredient };

    try {
      const response = await fetch("http://localhost:5000/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredientToAdd),
      });

      if (response.ok) {
        setNewIngredient({
          IngredientName: "",
          UnitOfMeasurement: "",
          CategoryID: "",
        });
        setShowModal(false);
        fetchIngredients(); // refresh list
      } else {
        alert("Failed to add ingredient.");
      }
    } catch (error) {
      alert("Error adding ingredient: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Ingredients</h2>
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
          + Add Ingredient
        </button>
      </div>

      <table className="min-w-full border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">IngredientsID</th>
            <th className="px-4 py-2 text-left">Ingredient Name</th>
            <th className="px-4 py-2 text-left">Unit</th>
            <th className="px-4 py-2 text-left">CategoryID</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => (
            <tr key={ing.IngredientsID} className="border-t">
              <td className="px-4 py-2">{ing.IngredientsID}</td>
              <td className="px-4 py-2">{ing.IngredientName}</td>
              <td className="px-4 py-2">{ing.UnitOfMeasurement}</td>
              <td className="px-4 py-2">{ing.CategoryID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Ingredient</h3>
            <form onSubmit={handleAddIngredient}>
              <div className="mb-4">
                <input
                  type="text"
                  value={newIngredient.IngredientName}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      IngredientName: e.target.value,
                    })
                  }
                  placeholder="Enter ingredient name"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={newIngredient.UnitOfMeasurement}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      UnitOfMeasurement: e.target.value,
                    })
                  }
                  placeholder="Unit of measurement"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={newIngredient.CategoryID}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      CategoryID: e.target.value,
                    })
                  }
                  placeholder="Category ID"
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

export default IngredientsTable;
