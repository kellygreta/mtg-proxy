import { useState } from "react";
import { fetchCardsByNames } from "./api/scryfall";
import PrintView from "./components/PrintView";
import CardGrid from "./components/CardGrid";
import DeckImporter from "./components/DeckImporter";

export default function App() {
  const [cards, setCards] = useState([]);
  const [layout, setLayout] = useState("3x3"); // default

  async function handleImport(parsedList) {
    try {
      const data = await fetchCardsByNames(parsedList);
      setCards(data);
    } catch (e) {
      alert(e.message);
    }
  }
  // 1 Sol Ring (CM2) 217
  // 3 Swamp (J25) 89
  // 2 Lightning Bolt
  // 4 Forest

  return (
    <div className="container py-4 text-center">
      <h1 className="fw-bold display-6">✨ MTG: Proxy Print ✨</h1>

      {/* Componente per importare liste */}
      <DeckImporter onImport={handleImport} />

      <div className="d-flex justify-content-evenly mb-3">
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
