import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Meal = {
  meal: string;
  food: string;
  calories: number;
  completed: boolean;
};

const DietPage = () => {
  const navigate = useNavigate();
  
  const [dietPlan] = useState<Meal[]>([
    { meal: 'Breakfast', food: 'Oatmeal with berries and nuts', calories: 350, completed: false },
    { meal: 'Lunch', food: 'Grilled chicken salad with olive oil dressing', calories: 450, completed: false },
    { meal: 'Snack', food: 'Greek yogurt with honey', calories: 200, completed: false },
    { meal: 'Dinner', food: 'Baked salmon with steamed vegetables', calories: 500, completed: false }
  ]);

  const toggleMealCompletion = (index: number) => {
    console.log(`Toggled meal completion for index ${index}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-8">
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Your Diet Plan</h1>
        
        <div className="space-y-4">
          {dietPlan.map((meal, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white">{meal.meal}</h3>
                <p className="text-white/70">{meal.food}</p>
                <p className="text-sm text-white/50">{meal.calories} calories</p>
              </div>
              <button
                onClick={() => toggleMealCompletion(index)}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                  meal.completed 
                    ? 'bg-slate-600 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {meal.completed ? 'Completed' : 'Mark Done'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietPage;