import { useState } from 'react';

interface RecipeCreatorProps {
    onCreate: (name: string) => void;
}

const RecipeCreator: React.FC<RecipeCreatorProps> = ({ onCreate }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onCreate(name.trim());
        setName("");
    };
    
    return (
     <form onSubmit={(handleSubmit)} className=''>
        <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='New recipe name'
            className='flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <button
            type='submit'
            className='text-sm px-3 py-2 rounded-md bg-indigo-500 text0white hover:bg-indigo-600'
        >
            Add
        </button>
     </form>   
    );
};

export default RecipeCreator;