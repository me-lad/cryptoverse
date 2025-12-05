// 📌 Directives
'use client';

// 📦 Imports
import { Dot } from 'recharts';
import { useCurrency } from '~hooks/useCurrency';
import { useScreenWidth } from '~hooks/useScreenWidth';

const CustomDot = ({ index, payload, ...props }: any) => {
  const { screenWidth } = useScreenWidth();
  const { convertedPrice } = useCurrency(payload?.value);

  if (!payload) return null;

  // Detect MIN / MAX
  const isMax = props.max === payload.value;
  const isMin = props.min === payload.value;
  if (!isMax && !isMin) return null;

  const isLabelNeed =
    (isMax && props.maxIndex === index) || (isMin && props.minIndex === index);

  const color = isMax ? 'var(--chart-green-normal)' : 'var(--chart-red-normal)';

  // >= 1024px → use Recharts width
  // < 1024px  → full screen minus Tailwind padding (px-7 → 28px)
  const chartWidth =
    screenWidth >= 1024
      ? props.width // ✔ desktop/tablet accurate
      : screenWidth - 28; // ✔ mobile accurate

  // Right-side detection
  const isRightSide = props.cx > chartWidth * 0.5;

  // Label positioning - calculate actual label width
  let charWidth: number;
  const priceLength = convertedPrice.length;

  if (screenWidth >= 420) {
    if (priceLength <= 6) charWidth = 10;
    else if (priceLength <= 10) charWidth = 9.25;
    else charWidth = 6;
  } else {
    if (priceLength <= 6) charWidth = 8;
    else if (priceLength <= 10) charWidth = 7.5;
    else charWidth = 5;
  }

  const labelWidth = convertedPrice.length * charWidth;
  const padding = 8;

  const posX = isRightSide
    ? props.cx - labelWidth - padding
    : props.cx + padding;

  const posY = props.cy + 5.5;

  // Clean text output
  const safeText = (() => {
    const sliced = convertedPrice.toString().slice(0, 12);
    return sliced.endsWith('.') || sliced.endsWith(',')
      ? sliced.slice(0, -1)
      : sliced;
  })();

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
        <text
          x={posX}
          y={posY}
          fontSize={screenWidth >= 420 ? 18 : 16}
          fontWeight={600}
          fill={color}
        >
          {safeText}
        </text>
      )}
    </g>
  );
};

export default CustomDot;
