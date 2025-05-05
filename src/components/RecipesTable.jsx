import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecipesTable() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    MenuID: "",
    IngredientsID: "",
    Quantity: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (
      !newRecipe.MenuID.trim() ||
      !newRecipe.IngredientsID.trim() ||
      !newRecipe.Quantity
    )
      return;

    try {
      const response = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Recipe added:", data);
        setNewRecipe({ MenuID: "", IngredientsID: "", Quantity: "" });
        setShowModal(false);
        fetchRecipes(); // refresh list
      } else {
        const errorText = await response.text();
        console.error("Failed to add recipe. Server response:", errorText);
        alert("Failed to add recipe.");
      }
    } catch (error) {
      console.error("Error in adding recipe:", error);
      alert("Error in adding recipe.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Recipes</h2>
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
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-5 py-2 rounded-md transition duration-300 ease-in-out flex items-center shadow-sm"
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
            Add Recipe
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
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
            <p className="mt-2 text-gray-500">No recipes found</p>
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
                    RecipeID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    MenuID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    IngredientsID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recipes.map((recipe) => (
                  <tr
                    key={recipe.RecipeID}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {recipe.RecipeID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {recipe.MenuID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {recipe.IngredientsID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {recipe.Quantity}
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
                Add New Recipe
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
            <form onSubmit={handleAddRecipe}>
              <div className="mb-4">
                <label
                  htmlFor="menuId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Menu ID
                </label>
                <input
                  id="menuId"
                  type="text"
                  value={newRecipe.MenuID}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, MenuID: e.target.value })
                  }
                  placeholder="Enter Menu ID"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ingredientsId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ingredients ID
                </label>
                <input
                  id="ingredientsId"
                  type="text"
                  value={newRecipe.IngredientsID}
                  onChange={(e) =>
                    setNewRecipe({
                      ...newRecipe,
                      IngredientsID: e.target.value,
                    })
                  }
                  placeholder="Enter Ingredients ID"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={newRecipe.Quantity}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, Quantity: e.target.value })
                  }
                  placeholder="Enter Quantity"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                />
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
                  className="px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors duration-300 shadow-sm"
                >
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipesTable;
