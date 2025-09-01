import { useState, useEffect } from "react";

export function useScreenWidth() {
  if (typeof window !== "undefined") {
    const [screenWidth, setScreenWidth] = useState(window && window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return screenWidth;
  }
}
