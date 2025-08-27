// src/App.jsx
import { useState } from "react";
import { fetchCardsByNames } from "./api/scryfall";
import PrintView from "./components/PrintView";
import CardGrid from "./components/CardGrid";

export default function App() {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState([]);
  const [layout, setLayout] = useState("3x3"); // default

  async function handleLoad() {
    const names = input
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!names.length) return;
    try {
      const data = await fetchCardsByNames(names);
      setCards(data);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="container py-4">
      <div className=" text-center mb-3">
        <h1 className="fw-bold m-0  display-6 ">✨ MTG: proxy print ✨</h1>
      </div>

      <div className="text-center mb-3">
        <label>Incolla una lista di nomi (uno per riga)</label>

        <textarea
          className="form-control"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-primary" onClick={handleLoad}>
          Carica carte
        </button>
        <select
          className="form-select w-auto"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="3x3">3x3 (9 per pagina, A4)</option>
          <option value="3x4">3x4 (12 per pagina)</option>
        </select>
        <button className="btn btn-success" onClick={() => window.print()}>
          Stampa
        </button>
      </div>

      <CardGrid
        cards={cards}
        onUpdateCard={(index, newPrint) => {
          setCards((prev) => {
            const updated = [...prev];
            updated[index] = newPrint;
            return updated;
          });
        }}
      />
      <hr />
      <h2 className="no-print">Anteprima fogli di stampa</h2>
      <PrintView cards={cards} layout={layout} />
    </div>
  );
}
