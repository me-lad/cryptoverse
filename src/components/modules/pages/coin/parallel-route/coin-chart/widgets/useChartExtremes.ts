// 📦 Third-Party imports
import { useEffect, useState } from 'react';

// 📦 Internal imports
import type { FormattedChartDataT } from '../../local';

// ⚙️ Custom hook
export const useChartExtremes = (data: FormattedChartDataT[]) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [minIndex, setMinIndex] = useState(0);

  useEffect(() => {
    const values = data.map((d) => d.value);
    setMinValue(Math.min(...values));
    setMaxValue(Math.max(...values));
  }, [data]);

  useEffect(() => {
    setMaxIndex(data.findIndex((item) => item.value === maxValue));
  }, [maxValue]);

  useEffect(() => {
    setMinIndex(data.findIndex((item) => item.value === minValue));
  }, [minValue]);

  return { minValue, maxValue, maxIndex, minIndex };
};
