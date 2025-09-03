import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { fetchCardsByNames } from "./api/scryfall";
import PrintView from "./components/PrintView";
import CardGrid from "./components/CardGrid";
import DeckImporter from "./components/DeckImporter";
import SettingsBar from "./components/SettingsBar";

import { useTheme } from "./context/ThemeContext";

export default function App() {
  const [cards, setCards] = useState([]);
  const [settings, setSettings] = useState({
    layout: "3x3",
    cropMarks: false,
    skipBasicLands: false,
    blackCorners: false,
    paperSize: "A4",
    gap: 0, //0mm
    scale: 1, //100%
  });
  //aggiunto onBeforeGetContent per aspettare flush React
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "MTG Proxy Print",
    onBeforeGetContent: () => new Promise((r) => setTimeout(r, 50)),
    removeAfterPrint: true,
  });

  const { theme, toggleTheme } = useTheme();

  async function handleImport(parsedList) {
    try {
      const data = await fetchCardsByNames(parsedList);
      //Rimappiamo mantenendo un uuid univoco per ogni copia
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

        <hr />
        <SettingsBar
          settings={settings}
          setSettings={setSettings}
          handlePrint={handlePrint}
        />
        <hr />

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
        layout={settings.layout}
        cropMarks={settings.cropMarks}
        skipBasicLands={settings.skipBasicLands}
        blackCorners={settings.blackCorners}
        //playtestWatermark={playtestWatermark}
        paperSize={settings.paperSize}
        gap={settings.gap}
        scale={settings.scale}
      />
    </>
  );
}
