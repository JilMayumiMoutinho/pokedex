import React, { useState } from "react";
import { BarOut, ProgressBar0 } from "./styled";

export const ProgressButton = ({ bar, color }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      background: `${color}`,
      opacity: 1,
      width: `${bar}%`,
    };
    setStyle(newStyle);
  }, 1000);

  return (
    <BarOut>
      <ProgressBar0 style={style}>{parseInt(bar * (230 / 100))}</ProgressBar0>
    </BarOut>
  );
};