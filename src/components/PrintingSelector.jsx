// src/components/PrintingSelector.jsx
import { useEffect, useState } from "react";

export default function PrintingSelector({ card, onChange }) {
  const [prints, setPrints] = useState([]);
  const [selectedId, setSelectedId] = useState(card.id);

  useEffect(() => {
    async function fetchPrints() {
      if (!card.prints_search_uri) return;
      const res = await fetch(card.prints_search_uri);
      const data = await res.json();
      setPrints(data.data);
    }
    fetchPrints();
  }, [card]);

  function handleChange(e) {
    const chosen = prints.find((p) => p.id === e.target.value);
    setSelectedId(e.target.value);
    if (chosen) onChange(chosen); // manda la print scelta al parent
  }

  return (
    <select
      className="form-select mt-2"
      value={selectedId}
      onChange={handleChange}
    >
      {prints.map((p) => (
        <option key={p.id} value={p.id}>
          {p.set_name} ({p.collector_number})
        </option>
      ))}
    </select>
  );
}
