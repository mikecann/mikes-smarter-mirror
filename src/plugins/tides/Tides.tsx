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
        overflow: "hidden",
        transform: "scale(0.8)",
        transformOrigin: "top left",
        width: "700px",
        height: "340px"
      }}
    >
      <img
        src="https://www.tide-forecast.com/system/charts-png/Busselton-Australia/tides.png"
        style={{
          filter: "invert(100%) grayscale(100%)",
          transform: "translate(-0px, -70px)",
        }}
      />
    </div>
  );
};
