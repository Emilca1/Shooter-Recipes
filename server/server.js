const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return { shooters: [], ingredients: ["Baileys","Get27","Jus d'orange"] };
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
};

const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// --- Routes Shooters ---
app.get("/shooters", (req, res) => {
  const data = readData();
  res.json(data.shooters);
});

app.post("/shooters", (req, res) => {
  const data = readData();
  const shooter = { id: uuidv4(), ...req.body, dateCreation: new Date().toISOString() };
  data.shooters.push(shooter);
  saveData(data);
  res.json(shooter);
});

app.put("/shooters/:id", (req, res) => {
  const data = readData();
  const index = data.shooters.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).send("Shooter non trouvé");
  data.shooters[index] = { ...data.shooters[index], ...req.body };
  saveData(data);
  res.json(data.shooters[index]);
});

app.delete("/shooters/:id", (req, res) => {
  const data = readData();
  data.shooters = data.shooters.filter(s => s.id !== req.params.id);
  saveData(data);
  res.sendStatus(204);
});

// --- Routes Ingredients ---
app.get("/ingredients", (req, res) => {
  const data = readData();
  res.json(data.ingredients);
});

app.post("/ingredients", (req, res) => {
  const data = readData();
  const { nom } = req.body;
  if (!nom || data.ingredients.includes(nom)) return res.status(400).send("Ingrédient invalide ou existant");
  data.ingredients.push(nom);
  saveData(data);
  res.json(nom);
});

app.delete("/ingredients/:nom", (req, res) => {
  const data = readData();
  data.ingredients = data.ingredients.filter(i => i !== req.params.nom);
  saveData(data);
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
