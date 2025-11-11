import { useState } from 'react';
import { DAYS, type DayName, type Recipe, type WeekPlan } from './features/weekly-planner/types';
import DayCard from './features/weekly-planner/components/DayCard';
import RecipeCreator from './features/weekly-planner/components/RecipeCreator';

const createId = () => Math.random().toString(36).slice(2);

export default function App() {
  // global list for recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // state fro the week's' recipes
  const [week, setWeek] = useState<WeekPlan>(() => {
    // empty object with all 7 days initialized as empty arrays
    const empty: WeekPlan = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };
    return empty;
  });

  const handleCreateRecipe = (name: string) => {
    const newRecipe = { id: createId(), name };
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const handleAssignRecipe = (day: DayName, recipe: Recipe) => {
    setWeek((prev) => ({
      ...prev,
      [day]: [...prev[day], recipe]
    }));
  }

  const handleRemoveRecipeFromDay = (day: DayName, recipeId: string) => {
    setWeek((prev) => ({
      ...prev,
      [day]: prev[day].filter((r) => r.id !== recipeId)
    }));
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto flex gap-6">

        {/* left: all recipes */}
        <section className="w-1/3 bg-white rounded-lg shadow-sm p-4 h-fit">
          <h2 className="text-xl font-semibold mb-3">All Recipes</h2>
          <RecipeCreator onCreate={handleCreateRecipe} />
          {recipes.length === 0 ? (
            <p className="text-sm text-slate-400 mt-2">
              No recipes created yet.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {recipes.map((r) => (
                <li
                  key={r.id}
                  className="border border-slate-200 rounded-md px-3 py-2"
                >
                  {r.name}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* center-fill week*/}
        <section className="flex-1 space-y-4">
          {DAYS.map((day) => (
            <DayCard
              key={day}
              day={day}
              recipes={week[day]}
              onAssignRecipe={handleAssignRecipe}
              onRemoveRecipe={handleRemoveRecipeFromDay}
              allRecipes={recipes}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
