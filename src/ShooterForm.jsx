import React, { useState, useEffect } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

const colorOptions = [
  { value: "Rouge", label: "Rouge" },
  { value: "Vert", label: "Vert" },
  { value: "Bleu", label: "Bleu" },
  { value: "Jaune", label: "Jaune" },
  { value: "Orange", label: "Orange" },
  { value: "Violet", label: "Violet" },
  { value: "Rose", label: "Rose" },
  { value: "Marron", label: "Marron" },
  { value: "Gris", label: "Gris" },
  { value: "Noir", label: "Noir" },
  { value: "Blanc", label: "Blanc" },
  { value: "Turquoise", label: "Turquoise" },
  { value: "Cyan", label: "Cyan" },
  { value: "Magenta", label: "Magenta" },
  { value: "Indigo", label: "Indigo" },
  { value: "Lavande", label: "Lavande" },
  { value: "Saumon", label: "Saumon" },
  { value: "Beige", label: "Beige" },
  { value: "Or", label: "Or" },
  { value: "Argent", label: "Argent" },
];

// Styles custom pour améliorer la visibilité dans react-select
const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#111827", // gris très sombre
    borderColor: "#4B5563", // gris moyen
    color: "#fff",
    "&:hover": { borderColor: "#8B5CF6" }, // violet au hover
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1F2937", // fond sombre du menu
    color: "#fff",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#8B5CF6" // violet si sélectionné
      : state.isFocused
      ? "#374151" // gris plus clair au hover
      : "transparent",
    color: state.isSelected ? "#fff" : "#E5E7EB", // texte blanc ou gris clair
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff", // valeur affichée en blanc
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF", // placeholder gris clair
  }),
};

const ShooterForm = ({ onSubmit, editingShooter, ingredientsList }) => {
  const [nom, setNom] = useState("");
  const [nombre, setNombre] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [note, setNote] = useState("");
  const [couleur, setCouleur] = useState("");

  useEffect(() => {
    if (editingShooter) {
      setNom(editingShooter.nom);
      setNombre(editingShooter.nombre);
      setIngredients(editingShooter.ingredients);
      setNote(editingShooter.note || "");
      setCouleur(editingShooter.couleur || "");
    }
  }, [editingShooter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom || !nombre || ingredients.length === 0) {
      return alert("Champs obligatoires manquants");
    }

    onSubmit({
      id: editingShooter ? editingShooter.id : uuidv4(),
      nom,
      nombre,
      ingredients,
      note: note || null,
      couleur: couleur || null,
      dateCreation: editingShooter
        ? editingShooter.dateCreation
        : new Date().toISOString(),
    });

    setNom("");
    setNombre(1);
    setIngredients([]);
    setNote("");
    setCouleur("");
  };

  const addIngredient = (ingredient) => {
    if (ingredients.find((ing) => ing.nom === ingredient.value)) return;
    setIngredients((prev) => [...prev, { nom: ingredient.value, dosage: 0 }]);
  };

  const updateDosage = (index, dosage) => {
    const updated = [...ingredients];
    updated[index].dosage = parseInt(dosage) || 0;
    setIngredients(updated);
  };

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-300">
        {editingShooter ? "Modifier" : "Ajouter"} un Shooter
      </h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Nom *</label>
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Nombre de shooters *</label>
        <input
          type="number"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Ingrédients *</label>
        <Select
          options={ingredientsList.map((ing) => ({ value: ing, label: ing }))}
          onChange={addIngredient}
          placeholder="Ajouter un ingrédient"
          styles={customSelectStyles}
        />
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex items-center mt-2 gap-2">
            <span className="w-32">{ing.nom}</span>
            <input
              type="number"
              value={ing.dosage}
              onChange={(e) => updateDosage(idx, e.target.value)}
              className="p-1 w-20 rounded bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <span>ml</span>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={() => removeIngredient(idx)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Note (1-10)</label>
        <input
          type="number"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Couleur</label>
        <Select
          options={colorOptions}
          onChange={(opt) => setCouleur(opt.value)}
          value={couleur ? { value: couleur, label: couleur } : null}
          styles={customSelectStyles}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition font-bold text-white shadow-lg"
      >
        {editingShooter ? "Sauvegarder" : "Ajouter"} Shooter
      </button>
    </form>
  );
};

export default ShooterForm;
