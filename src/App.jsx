// App.jsx
import { Routes, Route } from "react-router-dom";
import CategoryTable from "./components/CategoryTable";
import IngredientsTable from "./components/IngredientsTable";
import StockIngredientsTable from "./components/StockIngredientsTable";
import MenuItemsTable from "./components/MenuItemsTable";
import OrdersTable from "./components/OrdersTable";
import RecipesTable from "./components/RecipesTable";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<CategoryTable />} />
        <Route path="/ingredients" element={<IngredientsTable />} />
        <Route path="/stock-ingredients" element={<StockIngredientsTable />} />
        <Route path="/menu-items" element={<MenuItemsTable />} />
        <Route path="/orders" element={<OrdersTable />} />
        <Route path="/recipes" element={<RecipesTable />} />
      </Routes>
    </div>
  );
}

export default App;
