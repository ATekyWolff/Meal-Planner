import { useState } from 'react';
import { DAYS, type DayName, type Recipe, type WeekPlan } from './features/weekly-planner/types';
import DayCard from './features/weekly-planner/components/DayCard';
import RecipeModal from './features/weekly-planner/components/RecipeModal';

export default function App() {
  // global list for recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [showRecipeModal, setShowRecipeModal] = useState(false);

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
    <div className="min-h-screen bg-slate-500 p-6">
      <div className="max-w-6xl mx-auto flex gap-6">

      <section className="w-1/3 bg-green-200 rounded-lg shadow-sm p-4 h-fit">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">All Recipes</h2>
          <button
            onClick={() => setShowRecipeModal(true)}
            className="text-sm px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
          >
            + New
          </button>
        </div>

        {recipes.length === 0 ? (
          <p className="text-sm text-slate-400 mt-2">No recipes created yet.</p>
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

        <RecipeModal
          isOpen={showRecipeModal}
          onClose={() => setShowRecipeModal(false)}
          onSave={(recipe) => {
            setRecipes((prev) => [...prev, recipe]);
            setShowRecipeModal(false);
          }}
        />
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

        {/* Right-fill ingredient count*/}
        <section>
          <h2 className=''>All Ingredients</h2>

          {(() => {
              const allIngredients = Object.values(week)
                .flat()
                .flatMap((recipe) => recipe.ingredients);

              const grouped = allIngredients.reduce<Record<string, { name: string; unit: string; total: number }>>(
                (acc, ing) => {
                  const key = `${ing.name.toLowerCase()}-${ing.unit.toLowerCase()}`;
                  const amount = parseFloat(ing.amount) || 0;

                  if (!acc[key]) {
                    acc[key] = {
                      name: ing.name,
                    unit: ing.unit,
                    total: amount,
                  };
                } else {
                  acc[key].total += amount;
                }
                return acc;
              },
              {}
            );

            const combined = Object.values(grouped);

            if (combined.length === 0) {
              return <p className="text-sm text-slate-400">No ingredients yet.</p>;
            }

            return (
              <ul className="space-y-2 text-sm">
                {combined.map((i) => (
                  <li
                    key={`${i.name}-${i.unit}`}
                    className="border border-slate-200 rounded-md px-3 py-2"
                  >
                    <div className="flex justify-between">
                      <span>{i.name}</span>
                      <span>
                        {i.total} {i.unit}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          })()}
        </section>
      </div>
    </div>
  );
}
