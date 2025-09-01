import PrintingSelector from "./PrintingSelector";

// Componente che riceve:
// - card: array di carte (recuperate da Scryfall)
// - onUpdateCard: callback per aggiornare la carta scelta (quando si cambia stampa)
export default function CardGrid({ cards = [], onUpdateCard }) {
  if (!cards.length) return <p>Nessuna carta caricata.</p>;

  return (
    <div className="row row-cols-2 row-cols-md-4 g-3">
      {cards.map((c, i) => {
        const img = c.image_uris?.large || c.card_faces?.[0]?.image_uris?.large;
        return (
          <div className="col" key={c.uuid || c.id}>
            <div className="card shadow-sm h-100">
              {img && <img src={img} alt={c.name} className="card-img-top" />}
              <div className="card-body">
                <h6 className="card-title">{c.name}</h6>
                <PrintingSelector
                  key={c.id}
                  card={c}
                  onChange={(newPrint) => onUpdateCard(i, newPrint)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
