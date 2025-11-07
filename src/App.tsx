import { useState } from 'react';
import { DAYS, type DayName, type WeekPlan } from './features/weekly-planner/types';

const createId = () => Math.random().toString(36).slice(2);

export default function App() {
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

  // dummy recipe button for now
  const handleAddRecipe = (day: DayName) => {
    setWeek((prev) => ({
      ...prev,
      [day]: [
        ...prev[day],
        { id: createId(), name: "New Recipe" }
      ]
    }));
  }

  return (
    <div className='min-h-screen bg-slate-100 p-6'>
      <div className='max-w-3xl mx-auto space-y-4'>
        <h2>Today, I Learned about state state management, creating a type and exporting them, tailwindcss and some of the classNames, map is just iterating, and a few other things that I haven't cemented yet.</h2>
        {DAYS.map((day) => (
          <div key={day} className='bg-white p-4 rounded shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-lg font-semibold'>{day}</h2>
              <button
                onClick={() => handleAddRecipe(day)} 
                className='text-sm px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600'>
                + Add Recipe
              </button>
            </div>

          {week[day].length === 0 ? (
            <p className='text-sm text-slate-400'>No recipes yet.</p>
          ) : (
            <ul className=''>
              {week[day].map((r) => (
                <li className=''>
                  {r.name}
                </li>
              ))}
            </ul>
          )}
          </div>
        ))}
      </div>
    </div>
  );
}
