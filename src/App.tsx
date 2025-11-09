import { useState } from 'react';
import { DAYS, type DayName, type WeekPlan } from './features/weekly-planner/types';
import DayCard from './features/weekly-planner/components/DayCard';

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
  const handleAddRecipe = (day: DayName, recipeName: string) => {
    setWeek((prev) => ({
      ...prev,
      [day]: [...prev[day], { id: createId(), name: recipeName }]
    }));
  }

  const handleRemoveRecipe = (day: DayName, recipeId: string) => {
    setWeek((prev) => ({
      ...prev,
      [day]: prev[day].filter((r) => r.id !== recipeId)
    }));
  }

  return (
    <div className='min-h-screen bg-slate-100 p-6'>
      <div className='max-w-3xl mx-auto space-y-4'>
        {DAYS.map((day) => (
          <DayCard
            key={day}
            day={day}
            recipes={week[day]}
            onAddRecipe={handleAddRecipe}
            onRemoveRecipe={handleRemoveRecipe} 
          />
        ))}
      </div>
    </div>
  );
}
