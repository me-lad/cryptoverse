// 📦 Third-Party imports
import { Dot } from 'recharts';

// 📦 Internal imports
import { formatPrice } from '~helpers/formatters';

// ⚙️ Functional component
const CustomDot = ({ index, payload, ...props }: any) => {
  const isEqual = (a: number, b: number) => a === b;
  const isMax = isEqual(props.max, payload.value);
  const isMin = isEqual(props.min, payload.value);

  if (!isMax && !isMin) return null;

  let posX = props.cx + 10;
  let posY = props.cy + 5.5;

  const color = isMax ? 'var(--chart-green-normal)' : 'var(--chart-red-normal)';
  const isLabelNeed =
    (isMax && props.maxIndex === index) || (isMin && props.minIndex === index);

  if (props.cx > props.containerWidth * 0.6) {
    let newPosX = props.cx - 64;

    if (formatPrice(payload.value).length > 6) {
      newPosX = props.cx - 80;
    }
    if (formatPrice(payload.value).length > 8) {
      newPosX = props.cx - 100;
    }
    if (formatPrice(payload.value).length > 10) {
      newPosX = props.cx - 115;
    }
    if (formatPrice(payload.value).length > 12) {
      newPosX = props.cx - 120;
    }

    posX = newPosX;
  }

  return (
    <g>
      <Dot
        className="transition-transform duration-300 ease-out"
        key={payload.browser}
        r={4}
        cx={props.cx}
        cy={props.cy}
        fill={color}
        stroke={payload.fill}
      />
      {isLabelNeed && (
        <text x={posX} y={posY} fontSize={18} fontWeight={600} fill={color}>
          $
          {formatPrice(payload.value).toString().slice(0, 12).endsWith(',') ||
          formatPrice(payload.value).toString().slice(0, 12).endsWith('.')
            ? formatPrice(payload.value).toString().slice(0, 11)
            : formatPrice(payload.value).toString().slice(0, 12)}
        </text>
      )}
    </g>
  );
};
export default CustomDot;
