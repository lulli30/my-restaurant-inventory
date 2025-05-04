import { useState } from "react";
import {
  Layers,
  ShoppingBag,
  Package,
  Coffee,
  FileText,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";

function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const sections = [
    {
      name: "Categories",
      path: "/categories",
      icon: <Layers size={24} />,
      description: "Manage product categories and classifications",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
    {
      name: "Ingredients",
      path: "/ingredients",
      icon: <ShoppingBag size={24} />,
      description: "View and manage all available ingredients",
      color: "bg-green-50 hover:bg-green-100 border-green-200",
    },
    {
      name: "Stock Ingredients",
      path: "/stock-ingredients",
      icon: <Package size={24} />,
      description: "Track and update ingredient inventory levels",
      color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    },
    {
      name: "Menu Items",
      path: "/menu-items",
      icon: <Coffee size={24} />,
      description: "Create and modify items on your menu",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: <FileText size={24} />,
      description: "Manage detailed recipes and preparations",
      color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingCart size={24} />,
      description: "Process and track customer orders",
      color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Manage your restaurant operations from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <a
            key={section.name}
            href={section.path}
            className={`p-5 rounded-xl shadow-sm ${section.color} border transition-all duration-200 relative overflow-hidden block`}
            onMouseEnter={() => setHoveredCard(section.name)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                {section.icon}
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  {section.name}
                  <ChevronRight
                    size={16}
                    className={`ml-1 transition-transform duration-300 ${
                      hoveredCard === section.name ? "translate-x-1" : ""
                    }`}
                  />
                </h2>
                <p className="text-gray-600 mt-1">{section.description}</p>
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ${
                hoveredCard === section.name ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: `linear-gradient(to right, transparent, ${
                  section.color.includes("blue")
                    ? "#3b82f6"
                    : section.color.includes("green")
                    ? "#10b981"
                    : section.color.includes("amber")
                    ? "#f59e0b"
                    : section.color.includes("purple")
                    ? "#8b5cf6"
                    : section.color.includes("pink")
                    ? "#ec4899"
                    : section.color.includes("indigo")
                    ? "#6366f1"
                    : "#000"
                }, transparent)`,
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
