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
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch("http://localhost:5000/api/recipes");
    const data = await response.json();
    setRecipes(data);
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (!newRecipe.MenuID || !newRecipe.IngredientsID || !newRecipe.Quantity)
      return;

    const response = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });

    if (response.ok) {
      setNewRecipe({ MenuID: "", IngredientsID: "", Quantity: "" });
      setShowModal(false);
      fetchRecipes(); // refresh list
    } else {
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Recipes</h2>
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
          + Add Recipe
        </button>
      </div>

      <table className="min-w-full border border-gray-200 shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">RecipeID</th>
            <th className="px-4 py-2 text-left">MenuID</th>
            <th className="px-4 py-2 text-left">IngredientsID</th>
            <th className="px-4 py-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.RecipeID} className="border-t">
              <td className="px-4 py-2">{recipe.RecipeID}</td>
              <td className="px-4 py-2">{recipe.MenuID}</td>
              <td className="px-4 py-2">{recipe.IngredientsID}</td>
              <td className="px-4 py-2">{recipe.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Recipe</h3>
            <form onSubmit={handleAddRecipe}>
              <div className="mb-4">
                <input
                  type="text"
                  value={newRecipe.MenuID}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, MenuID: e.target.value })
                  }
                  placeholder="Enter MenuID"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={newRecipe.IngredientsID}
                  onChange={(e) =>
                    setNewRecipe({
                      ...newRecipe,
                      IngredientsID: e.target.value,
                    })
                  }
                  placeholder="Enter IngredientsID"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={newRecipe.Quantity}
                  onChange={(e) =>
                    setNewRecipe({ ...newRecipe, Quantity: e.target.value })
                  }
                  placeholder="Enter Quantity"
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

export default RecipesTable;
