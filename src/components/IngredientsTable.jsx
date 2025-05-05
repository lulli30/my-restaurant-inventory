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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ingredients");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
    } finally {
      setIsLoading(false);
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
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Ingredients</h2>
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
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md transition duration-300 ease-in-out flex items-center shadow-sm"
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
            Add Ingredient
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading ingredients...</p>
          </div>
        ) : ingredients.length === 0 ? (
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
            <p className="mt-2 text-gray-500">No ingredients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ingredient Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Unit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ingredients.map((ing) => (
                  <tr
                    key={ing.IngredientsID}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ing.IngredientsID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {ing.IngredientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {ing.UnitOfMeasurement}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {ing.CategoryID}
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
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Add New Ingredient
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
            <form onSubmit={handleAddIngredient}>
              <div className="mb-4">
                <label
                  htmlFor="ingredientName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ingredient Name*
                </label>
                <input
                  id="ingredientName"
                  type="text"
                  value={newIngredient.IngredientName}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      IngredientName: e.target.value,
                    })
                  }
                  placeholder="Enter ingredient name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="unitOfMeasurement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Unit of Measurement
                </label>
                <input
                  id="unitOfMeasurement"
                  type="text"
                  value={newIngredient.UnitOfMeasurement}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      UnitOfMeasurement: e.target.value,
                    })
                  }
                  placeholder="e.g., kg, g, liter, cup"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category ID*
                </label>
                <input
                  id="categoryId"
                  type="text"
                  value={newIngredient.CategoryID}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      CategoryID: e.target.value,
                    })
                  }
                  placeholder="Enter category ID number"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the numeric ID of an existing category
                </p>
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
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-300 shadow-sm"
                >
                  Add Ingredient
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
