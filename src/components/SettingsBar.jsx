export default function SettingsBar({ settings, setSettings, handlePrint }) {
  const update = (field, value) => setSettings({ ...settings, [field]: value });

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-3 no-print">
        {/* Divider con testo */}
        <div className="d-flex align-items-center w-100">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">Settings</span>
          <hr className="flex-grow-1" />
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Layout TODO*/}
          <select
            disabled
            className="form-select w-auto"
            value={settings.layout}
            onChange={(e) => update("layout", e.target.value)}
          >
            <option value="3x3">3x3 (9 per pagina, A4)</option>
            <option value="3x4">3x4 (12 per pagina)</option>
          </select>
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Crop marks TODO */}
          <div>
            <label className="form-check-label me-2">Crop marks</label>
            <input
              disabled
              type="checkbox"
              className="form-check-input"
              checked={settings.cropMarks}
              onChange={(e) => update("cropMarks", e.target.checked)}
            />
          </div>

          {/* Skip basic lands */}
          <div>
            <label className="form-check-label me-2">Skip basic lands</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={settings.skipBasicLands}
              onChange={(e) => update("skipBasicLands", e.target.checked)}
            />
          </div>

          {/* Black corners TODO*/}
          <div>
            <label className="form-check-label me-2 ">Black corners</label>
            <input
              disabled
              type="checkbox"
              className="form-check-input"
              checked={settings.blackCorners}
              onChange={(e) => update("blackCorners", e.target.checked)}
            />
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Paper TODO*/}
          <div>
            <label className="form-label me-2">Paper</label>
            <select
              disabled
              className="form-select d-inline w-auto"
              value={settings.paperSize}
              onChange={(e) => update("paperSize", e.target.value)}
            >
              <option value="A4">A4 (21.0x29.7 cm)</option>
              <option value="Letter">Letter (8.5x11 in)</option>
            </select>
          </div>

          {/* Gap */}
          <div>
            <label className="form-label me-2">Gap</label>
            <select
              className="form-select d-inline w-auto"
              value={settings.gap}
              onChange={(e) => update("gap", parseFloat(e.target.value))}
            >
              <option value={0}>0 mm</option>
              <option value={0.2}>0.2 mm</option>
              <option value={1}>1 mm</option>
              <option value={2}>2 mm</option>
              <option value={4}>4 mm</option>
            </select>
          </div>

          {/* Scale */}
          <div>
            <label className="form-label me-2">Scale</label>
            <select
              className="form-select d-inline w-auto"
              value={settings.scale}
              onChange={(e) => update("scale", parseFloat(e.target.value))}
            >
              {/* todo explain options */}
              <option value={0.95}>95%</option>
              <option value={1}>100%</option>
              <option value={1.05}>105%</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-success" onClick={handlePrint}>
            Stampa
          </button>
        </div>
      </div>
    </>
  );
}
