import { useState } from 'react';
import { type DayName, type Recipe } from '../types';

interface DayCardProps {
    day: DayName;
    recipes: Recipe[];
    allRecipes: Recipe[];
    onAssignRecipe: (day: DayName, recipe: Recipe) => void;
    onRemoveRecipe: (day: DayName, recipeId: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({ 
    day,
    recipes,
    allRecipes,
    onAssignRecipe,
    onRemoveRecipe
}) => {
    const [selected, setSelected] = useState("");

    const handleAssign = () => {
        const recipe = allRecipes.find((r) => r.id === selected);
        if (!recipe) return;
        onAssignRecipe(day, recipe);
        setSelected("");
    };

    return (
        <section className='bg-white rounded-lg shadow-sm p-4'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-lg font-semibold'>{day}</h2>
            </div>

            <div className='flex gap-2 mb-3'>
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className='flex-1 rounded-md border border-slate-200 pxp-3 py-2 text-sm' 
                >
                    <option value="">Select a recipe...</option>
                    {allRecipes.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleAssign}
                    disabled={!selected}
                    className='text-sm px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50'
                >
                    Add
                </button>
            </div>

            {recipes.length === 0  ? (
                <p className='text-sm text-slate-400'>No Recipes Yet.</p>
            ) : (
                <ul className="space-y-2 text-sm">
                    {recipes.map((r) => (
                        <li
                            key={r.id}
                            className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2"
                        >
                            <span>{r.name}</span>
                            <button
                                onClick={() => onRemoveRecipe(day, r.id)}
                                className="text-xs text-red-500 hover:text-red-600"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
    </section>
    );
};

export default DayCard;