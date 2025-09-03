import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { fetchCardsByNames } from "./api/scryfall";
import PrintView from "./components/PrintView";
import CardGrid from "./components/CardGrid";
import DeckImporter from "./components/DeckImporter";

export default function App() {
  const [cards, setCards] = useState([]);
  const [layout, setLayout] = useState("3x3"); // default
  const [cropMarks, setCropMarks] = useState(false);
  const [skipBasicLands, setSkipBasicLands] = useState(false);
  const [blackCorners, setBlackCorners] = useState(false);
  // const [playtestWatermark, setPlaytestWatermark] = useState(false);
  const [paperSize, setPaperSize] = useState("A4");
  const [gap, setGap] = useState(4);
  const [scale, setScale] = useState(1);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "MTG Proxy Print",
  });

  async function handleImport(parsedList) {
    try {
      const data = await fetchCardsByNames(parsedList);
      // 🔑 Rimappiamo mantenendo un uuid univoco per ogni copia
      const withUUID = data.map((card, i) => ({
        ...card,
        uuid: crypto.randomUUID(), // garantisce sempre unicità
      }));

      setCards(withUUID);
    } catch (e) {
      alert(e.message);
    }
  }
  // 1 Sol Ring (CM2) 217
  // 3 Swamp (J25) 89
  // 2 Lightning Bolt
  // 4 Forest

  return (
    <>
      <div className="container py-4 text-center">
        <h1 className="fw-bold display-6">✨ MTG: Proxy Print ✨</h1>

        {/* Componente per importare liste */}
        <DeckImporter onImport={handleImport} />

        <div className="d-flex flex-wrap justify-content-center gap-3 mb-3 no-print">
          <select
            className="form-select w-auto"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="3x3">3x3 (9 per pagina, A4)</option>
            <option value="3x4">3x4 (12 per pagina)</option>
          </select>
          <div>
            <label className="form-check-label me-2">Crop marks</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={cropMarks}
              onChange={(e) => setCropMarks(e.target.checked)}
            />
          </div>

          <div>
            <label className="form-check-label me-2">Skip basic lands</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={skipBasicLands}
              onChange={(e) => setSkipBasicLands(e.target.checked)}
            />
          </div>

          <div>
            <label className="form-check-label me-2">Black corners</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={blackCorners}
              onChange={(e) => setBlackCorners(e.target.checked)}
            />
          </div>

          {/* <div>
            <label className="form-check-label me-2">Playtest watermark</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={playtestWatermark}
              onChange={(e) => setPlaytestWatermark(e.target.checked)}
            />
          </div> */}

          <div>
            <label className="form-label me-2">Paper</label>
            <select
              className="form-select d-inline w-auto"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
            >
              <option value="A4">A4 (21.0x29.7 cm)</option>
              <option value="Letter">Letter (8.5x11 in)</option>
            </select>
          </div>

          <div>
            <label className="form-label me-2">Gap</label>
            <select
              className="form-select d-inline w-auto"
              value={gap}
              onChange={(e) => setGap(e.target.value)}
            >
              <option value={0}>0 mm</option>
              <option value={0.2}>0.2 mm</option>
              <option value={1}>1 mm</option>
              <option value={2}>2 mm</option>
            </select>
          </div>

          <div>
            <label className="form-label me-2">Scale</label>
            <select
              className="form-select d-inline w-auto"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
            >
              <option value={0.95}>95%</option>
              <option value={1}>100%</option>
              <option value={1.05}>105%</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={handlePrint}>
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
      </div>
      <PrintView
        ref={printRef}
        cards={cards}
        layout={layout}
        cropMarks={cropMarks}
        skipBasicLands={skipBasicLands}
        blackCorners={blackCorners}
        //playtestWatermark={playtestWatermark}
        paperSize={paperSize}
        gap={gap}
        scale={scale}
      />
    </>
  );
}
