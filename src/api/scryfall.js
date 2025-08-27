export async function fetchCardsByNames(names = []) {
  // names = ["Black Lotus", "Liliana of the Veil", ...]
  const identifiers = names.map(n => ({ name: n }));
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