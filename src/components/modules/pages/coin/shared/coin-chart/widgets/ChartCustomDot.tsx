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

  // SVG coordinate space: use cx directly; avoid screenWidth math for label placement
  const padding = 8;
  const isRightSide =
    props.cx > (props.viewBox?.width ?? props.width ?? 0) * 0.5;

  // Clean text output
  const safeText = (() => {
    const sliced = convertedPrice.toString().slice(0, 12);
    return sliced.endsWith('.') || sliced.endsWith(',')
      ? sliced.slice(0, -1)
      : sliced;
  })();

  const fontSize = screenWidth >= 420 ? 18 : 16;

  // Position by anchoring instead of estimating label width
  const labelX = isRightSide ? props.cx - padding : props.cx + padding;
  const textAnchor = isRightSide ? 'end' : 'start';

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
          x={labelX}
          y={props.cy}
          fontSize={fontSize}
          fontWeight={600}
          fill={color}
          textAnchor={textAnchor}
          dominantBaseline="middle"
        >
          {safeText}
        </text>
      )}
    </g>
  );
};

export default CustomDot;
