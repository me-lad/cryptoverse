// 📦 Third-Party imports
import { useEffect, useState } from 'react';

// ⚙️ Custom hook
export const useChartContainerSize = (
  ref: React.RefObject<HTMLDivElement | null>,
) => {
  const [chartContainerWidth, setChartContainerWidth] = useState(0);
  const [chartContainerHight, setChartContainerHight] = useState(0);

  useEffect(() => {
    setChartContainerWidth(ref.current?.clientWidth || 850);
    setChartContainerHight(ref.current?.clientHeight || 80);
  }, [ref.current]);

  return { chartContainerWidth, chartContainerHight };
};
