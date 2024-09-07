import * as React from "react";
import { Horizontal } from "../../components/Horizontal";

interface Props {
  width: number;
  progressPercent: number;
}

const color = "#666";

export const ProgressBar: React.FC<Props> = ({ width, progressPercent }) => {
  return (
    <div style={{ width, border: `1px solid ${color}`, padding: 1 }}>
          <Horizontal
        style={{
          width: width * (progressPercent / 100),
          backgroundColor: color,
          height: "100%",
          fontSize: "0.6rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {progressPercent}%
      </Horizontal>
    </div>
  );
};
