// 📌 Directives
'use client';

// 📦 Third-Party imports
import { Dot } from 'recharts';

// 📦 Internal imports
import { formatPrice } from '~helpers/formatters';
import { useCurrency } from '~hooks/useCurrency';

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

  const { convertedPrice } = useCurrency(payload.value);

  if (props.cx > props.containerWidth * 0.6) {
    let newPosX = props.cx - 64;

    if (convertedPrice.length > 6) {
      newPosX = props.cx - 80;
    }
    if (convertedPrice.length > 8) {
      newPosX = props.cx - 100;
    }
    if (convertedPrice.length > 10) {
      newPosX = props.cx - 115;
    }
    if (convertedPrice.length > 12) {
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
          {convertedPrice.toString().slice(0, 12).endsWith(',') ||
          convertedPrice.toString().slice(0, 12).endsWith('.')
            ? convertedPrice.toString().slice(0, 11)
            : convertedPrice.toString().slice(0, 12)}
        </text>
      )}
    </g>
  );
};
export default CustomDot;
