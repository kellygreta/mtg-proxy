import "./print.css"; // stile di stampa
import { forwardRef } from "react";

const PrintView = forwardRef(
  (
    {
      cards = [],
      layout = "3x3",
      cropMarks,
      skipBasicLands,
      blackCorners,
      // playtestWatermark,
      paperSize,
      gap,
      scale,
    },
    ref
  ) => {
    const layouts = { "3x3": { cols: 3 }, "3x4": { cols: 3 } };
    const cols = layouts[layout]?.cols || 3;

    // Filtra terre base se richiesto
    const visibleCards = skipBasicLands
      ? cards.filter((c) => !c.type_line?.includes("Basic Land"))
      : cards;

    return (
      <div
        ref={ref}
        className={`text-center print-area ${
          blackCorners ? "black-corners" : ""
        }`}
        style={{
          ["--cols"]: cols,
          ["--gap"]: gap,
          ["--scale"]: scale,
        }}
        data-paper={paperSize}
        data-crop={cropMarks}
      >
        <h2
          className="text-center
          "
        >
          Anteprima fogli di stampa
        </h2>
        <div className="print-sheet d-flex flex-wrap justify-content-center">
          {visibleCards.map((c, i) => {
            const img =
              c.image_uris?.normal || c.card_faces?.[0]?.image_uris?.normal;
            return (
              <div className="card-for-print" key={c.uuid || i}>
                <img src={img} alt={c.name} />
                {/* <div className="watermark">
                  {playtestWatermark ? "PLAYTEST" : "PROXY"}
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default PrintView;
