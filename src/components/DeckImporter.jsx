import { useState } from "react";

/**
 * Componente per importare una lista di carte
 * Supporta sia formato semplice (uno per riga)
 * che formato Arena (es: "1 Sol Ring (CM2) 217")
 */
export default function DeckImporter({ onImport }) {
  const [text, setText] = useState("");

  function parseInput() {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const cards = [];

    lines.forEach((line) => {
      // Esempio formato: "3 Swamp (J25) 89"
      const match = line.match(/^(\d+)x?\s+(.+?)(?:\s+\((\w+)\)\s+(\d+))?$/);

      if (match) {
        const qty = parseInt(match[1], 10);
        const name = match[2];
        const set = match[3];
        const collector = match[4];

        for (let i = 0; i < qty; i++) {
          const id = crypto.randomUUID(); // 🔑 id unico per ogni carta
          if (set && collector) {
            cards.push({ id, name, set, collector });
          } else {
            cards.push({ id, name });
          }
        }
      }
    });

    return cards;
  }

  function handleImport() {
    const parsed = parseInput();
    if (parsed.length) {
      onImport(parsed);
    } else {
      alert("Formato non valido o lista vuota!");
    }
  }

  return (
    <div className="mb-3">
      <label>Incolla la lista del mazzo (Arena o testo libero)</label>
      <textarea
        className="form-control mx-auto"
        style={{ maxWidth: "600px" }}
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`1 Sol Ring (CM2) 217 \n3 Swamp (J25) 89 \n2 Lightning Bolt \n4 Forest`}
      />
      <button className="btn btn-primary mt-2" onClick={handleImport}>
        Importa
      </button>
    </div>
  );
}
