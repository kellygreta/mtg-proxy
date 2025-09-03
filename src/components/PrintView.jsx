import "./print.css"; // stile di stampa

export default function PrintView({ cards = [], layout = "3x3" }) {
  // definizione layout (quante colonne per foglio)
  const layouts = {
    "3x3": { cols: 3 },
    "3x4": { cols: 3 },
  };
  const cols = layouts[layout]?.cols || 3;

  return (
    <div className="print-wrapper">
      <div className="print-sheet" style={{ ["--cols"]: cols }}>
        {cards.map((c, i) => {
          const img =
            c.image_uris?.normal || c.card_faces?.[0]?.image_uris?.normal;
          return (
            <div className="card-for-print" key={c.uuid || i}>
              <img src={img} alt={c.name} />
              <div className="watermark">PROXY</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
