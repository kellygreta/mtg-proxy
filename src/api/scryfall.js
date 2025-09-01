// Funzione per recuperare carte da Scryfall partendo da una lista
// Può accettare sia solo nomi (es: "Black Lotus") sia oggetti con set + numero
export async function fetchCardsByNames(names = []) {
  // Esempio di input:
  // names = [
  //   { name: "Lightning Bolt" },
  //   { name: "Sol Ring", set: "cm2", collector: "217" }
  // ]

  // Prepara la lista di identificatori nel formato richiesto da Scryfall
  const identifiers = names.map(
    (item) => {
    // Se la carta ha set + numero collezione, usiamo quei campi
    if (item.set && item.collector) {
      return {
        set: item.set.toLowerCase(), // codice set in minuscolo
        collector_number: String(item.collector), // numero carta come stringa
      };
    }
    // Altrimenti usiamo solo il nome della carta
    return { name: item.name };
  }
  );
  const res = await fetch('https://api.scryfall.com/cards/collection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifiers })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Scryfall error: ' + txt);
  }
  const json = await res.json();
  return json.data; // array di oggetti card
}