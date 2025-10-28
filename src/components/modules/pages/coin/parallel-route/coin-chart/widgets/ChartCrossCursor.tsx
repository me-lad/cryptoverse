import React from 'react';
import { ReferenceLine } from 'recharts';

const CrossCursor: React.FC<any> = (props) => {
  const { x: px, y: py, width: w, height: h, viewBox, points } = props || {};

  const width = w ?? viewBox?.width;
  const height = h ?? viewBox?.height;

  // Prefer explicit pixel coordinates when provided, otherwise try points
  const x = px ?? (points && points[0] && points[0].x);
  const y = py ?? (points && points[0] && points[0].y);

  if (x == null || y == null || width == null || height == null) return null;

  const stroke = props.stroke ?? 'var(--color-primary)';
  const strokeWidth = props.strokeWidth ?? 2;
  const strokeDasharray = props.strokeDasharray ?? '5 3';
  const strokeOpacity = 0.8;

  return (
    <g className="recharts-crosshair-cursor">
      <line
        x1={x}
        x2={x}
        y1={0}
        y2={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        pointerEvents="none"
        strokeOpacity={strokeOpacity}
      />

      <ReferenceLine
        x1={0}
        x2={width}
        y={props.payload[0].value}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        pointerEvents="none"
        strokeOpacity={strokeOpacity}
      />
    </g>
  );
};

export default CrossCursor;
