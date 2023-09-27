import { Vertical } from "gls/lib";
import * as React from "react";

interface Props {}

export const Tides: React.FC<Props> = ({}) => {
  return (
    <div
      style={{
        position: "relative",
        minWidth: "100px",
        minHeight: "100px",
        border: `1px dashed rgba(255,255,255,0.2)`,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src="https://www.tide-forecast.com/system/charts-png/Busselton-Australia/tides.png"
        style={{
          height: "420px",
          filter: "invert(100%) grayscale(100%)",
          transform: "scale(1.6) translate(175px, 40px)",
        }}
      />
    </div>
  );
};
