import { useState } from "react";
import { type Ingredient, type Recipe } from "../types";

const UNIT_OPTIONS = [
  "g",
  "kg",
  "oz",
  "lb",
  "ml",
  "L",
  "tsp",
  "tbsp",
  "cup",
  "pcs",
];

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const createId = () => Math.random().toString(36).slice(2);

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: createId(), name: "", amount: "", unit: ""},
    ]);
  };

  const handleIngredientChange = (
    id: string,
    field: keyof Omit<Ingredient, "id">,
    value: string
  ) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const newRecipe: Recipe = {
      id: createId(),
      name: name.trim(),
      ingredients: ingredients.filter((i) => i.name.trim() !== ""),
    };
    onSave(newRecipe);
    setName("");
    setIngredients([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Create New Recipe</h2>

        {/* Recipe name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Recipe Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Chicken Stir Fry"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Ingredients</h3>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="text-sm px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
            >
              + Add
            </button>
          </div>

          {ingredients.length === 0 ? (
            <p className="text-sm text-slate-400">No ingredients yet.</p>
          ) : (
            <div className="space-y-2">
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <input
                    type="text"
                    placeholder="Ingredient"
                    value={ing.name}
                    onChange={(e) =>
                      handleIngredientChange(ing.id, "name", e.target.value)
                    }
                    className="col-span-5 border border-slate-200 rounded-md px-3 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={ing.amount}
                    onChange={(e) =>
                      handleIngredientChange(ing.id, "amount", e.target.value)
                    }
                    className="col-span-3 border border-slate-200 rounded-md px-3 py-1 text-sm"
                  />
                  <select
                    value={ing.unit}
                    onChange={(e) =>
                        handleIngredientChange(ing.id, "unit", e.target.value)
                    }
                    className="col-span-3 border border-slate-200 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="">Select</option>
                    {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u}>
                            {u}
                        </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ing.id)}
                    className="col-span-1 text-red-500 hover:text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
