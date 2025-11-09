import { useState } from 'react';
import { type DayName, type Recipe } from '../types';

interface DayCardProps {
    day: DayName;
    recipes: Recipe[];
    onAddRecipe: (day: DayName, recipeName: string) => void;
    onRemoveRecipe: (day: DayName, recipeId: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, recipes, onAddRecipe, onRemoveRecipe }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newRecipeName, setNewRecipeName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRecipeName.trim()) return;
        onAddRecipe(day, newRecipeName.trim());
        setNewRecipeName("");
        setIsAdding(false);
    }

    return (
        <section className='bg-white rounded-lg shadow-sm p-4'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-lg font-semibold'>{day}</h2>
                <button
                    className='text-sm px-1 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600'
                    onClick={() => setIsAdding((prev) => !prev)}
                >
                    + Add Recipe
                </button>
            </div>

        {isAdding && (
            <form onSubmit={handleSubmit} className=''>
                <input
                    type="text"
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    placeholder='Recipe Name'
                    className='flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500' />
                <button
                    type='submit'
                    className='text-sm px-3 py-2 rounded-md bg-slate-900 text-white' 
                >
                    Save
                </button>
            </form>
        )}

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