import { finishes } from '../../data/products';
import './ColorPicker.css';

export default function ColorPicker({
  selectedWood,
  selectedLegs,
  onWoodChange,
  onLegsChange,
  showMixMatch = true,
}) {
  const woodFinish = finishes.wood.find(f => f.id === selectedWood);
  const legFinish = finishes.legs.find(f => f.id === selectedLegs);

  const priceDelta = (woodFinish?.price || 0) + (legFinish?.price || 0);

  return (
    <div className="color-picker">
      <div className="color-picker-row">
        <span className="color-picker-label">
          Top Finish: <span className="selected-name">{woodFinish?.name}</span>
        </span>
        <div className="swatches">
          {finishes.wood.map(finish => (
            <button
              key={finish.id}
              className={`swatch ${selectedWood === finish.id ? 'active' : ''}`}
              onClick={() => onWoodChange(finish.id)}
              title={finish.name}
              aria-label={`Select ${finish.name} finish`}
            >
              <div className="swatch-inner" style={{ backgroundColor: finish.hex }} />
            </button>
          ))}
        </div>
      </div>

      {showMixMatch && (
        <div className="color-picker-row">
          <span className="color-picker-label">
            Leg Finish: <span className="selected-name">{legFinish?.name}</span>
          </span>
          <div className="swatches">
            {finishes.legs.map(finish => (
              <button
                key={finish.id}
                className={`swatch ${selectedLegs === finish.id ? 'active' : ''}`}
                onClick={() => onLegsChange(finish.id)}
                title={finish.name}
                aria-label={`Select ${finish.name} legs`}
              >
                <div className="swatch-inner" style={{ backgroundColor: finish.hex }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {priceDelta > 0 && (
        <div className="color-picker-price-delta">
          +${priceDelta} for selected finishes
        </div>
      )}
    </div>
  );
}
