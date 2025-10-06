import React, { useState } from "react";

const ShooterList = ({ shooters, onEdit, onDelete }) => {
  const [sortType, setSortType] = useState("dateDesc");

  const sortedShooters = [...shooters].sort((a, b) => {
    if (sortType === "dateAsc")
      return new Date(a.dateCreation) - new Date(b.dateCreation);
    if (sortType === "dateDesc")
      return new Date(b.dateCreation) - new Date(a.dateCreation);
    if (sortType === "noteAsc") return (a.note || 0) - (b.note || 0);
    if (sortType === "noteDesc") return (b.note || 0) - (a.note || 0);
    return 0;
  });

  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">
        📜 Liste des Shooters
      </h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Trier par :</label>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 rounded bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-400 outline-none"
        >
          <option value="dateDesc">Plus récent</option>
          <option value="dateAsc">Plus ancien</option>
          <option value="noteDesc">Meilleure note</option>
          <option value="noteAsc">Moins bonne note</option>
        </select>
      </div>

      {sortedShooters.length === 0 ? (
        <p className="text-gray-400 italic">Aucune recette pour l’instant...</p>
      ) : (
        sortedShooters.map((s) => (
          <div
            key={s.id}
            className="bg-gray-900 p-4 rounded-xl mb-3 shadow-md border border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-purple-400">{s.nom}</h3>
              <div className="flex gap-2">
                <button
                  className="text-sm px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded-lg transition"
                  onClick={() => onEdit(s)}
                >
                  ✏️ Éditer
                </button>
                <button
                  className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg transition"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Voulez-vous vraiment supprimer "${s.nom}" ?`
                      )
                    ) {
                      onDelete(s.id);
                    }
                  }}
                >
                  🗑 Supprimer
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-300">Nombre : {s.nombre}</p>
            <p className="text-sm text-gray-300">Note : {s.note || "-"}/10</p>
            <p className="text-sm text-gray-300">Couleur : {s.couleur || "-"}</p>
            <div className="mt-2">
              <h4 className="font-semibold text-gray-200">Ingrédients :</h4>
              <ul className="list-disc list-inside text-gray-400">
                {s.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.nom} - {ing.dosage}ml
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Créé le : {new Date(s.dateCreation).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ShooterList;
