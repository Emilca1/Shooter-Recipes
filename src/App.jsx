import React, { useState, useEffect } from "react";
import ShooterForm from "./ShooterForm";
import ShooterList from "./ShooterList";
import './index.css';

const API_BASE = "http://localhost:5000";

const App = () => {
  const [shooters, setShooters] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editingShooter, setEditingShooter] = useState(null);

  // --- Fetch initial data ---
  useEffect(() => {
    fetch(`${API_BASE}/shooters`).then(res => res.json()).then(setShooters);
    fetch(`${API_BASE}/ingredients`).then(res => res.json()).then(setIngredients);
  }, []);

  // --- Shooters ---
  const addOrUpdateShooter = (shooter) => {
    if (editingShooter) {
      fetch(`${API_BASE}/shooters/${editingShooter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shooter),
      })
      .then(res => res.json())
      .then(updated => {
        setShooters(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditingShooter(null);
      });
    } else {
      fetch(`${API_BASE}/shooters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shooter),
      })
      .then(res => res.json())
      .then(newShooter => setShooters(prev => [...prev, newShooter]));
    }
  };

  const deleteShooter = (id) => {
    fetch(`${API_BASE}/shooters/${id}`, { method: "DELETE" })
      .then(() => setShooters(prev => prev.filter(s => s.id !== id)));
  };

  // --- Ingredients ---
  const addIngredient = (nom) => {
    if (!nom || ingredients.includes(nom)) return;
    fetch(`${API_BASE}/ingredients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom }),
    })
    .then(res => res.json())
    .then(newIng => setIngredients(prev => [...prev, newIng]));
  };

  const deleteIngredient = (nom) => {
    fetch(`${API_BASE}/ingredients/${nom}`, { method: "DELETE" })
      .then(() => setIngredients(prev => prev.filter(i => i !== nom)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-400 drop-shadow-lg">
          🍹 Shooter Recipes 🍹
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ShooterForm
            onSubmit={addOrUpdateShooter}
            editingShooter={editingShooter}
            ingredientsList={ingredients}
          />
          <div className="md:col-span-2">
            <ShooterList
              shooters={shooters}
              onEdit={setEditingShooter}
              onDelete={deleteShooter}
            />
            <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 mt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-300">🧾 Gestion des Ingrédients</h2>
              <IngredientManager
                ingredients={ingredients}
                addIngredient={addIngredient}
                deleteIngredient={deleteIngredient}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IngredientManager = ({ ingredients, addIngredient, deleteIngredient }) => {
  const [newIngredient, setNewIngredient] = useState("");

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Nom d'un ingrédient"
          className="flex-grow p-2 rounded bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-green-400 outline-none"
        />
        <button
          onClick={() => {
            addIngredient(newIngredient.trim());
            setNewIngredient("");
          }}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md font-semibold"
        >
          ➕ Ajouter
        </button>
      </div>
      <ul className="space-y-2">
        {ingredients.map((ing, idx) => (
          <li key={idx} className="flex justify-between items-center bg-gray-900 px-3 py-2 rounded-lg shadow border border-gray-700">
            <span>{ing}</span>
            <button className="text-red-500 hover:text-red-700" onClick={() => deleteIngredient(ing)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
