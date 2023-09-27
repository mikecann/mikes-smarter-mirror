import { Vertical } from "gls/lib";
import * as React from "react";

interface Props {
  children: React.ReactNode[];
  intervalMs?: number;
}

export const Cycle: React.FC<Props> = ({ children, intervalMs = 10000 }) => {
  const [visibleIndex, setVisibleIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(
      () =>
        setVisibleIndex((p) => {
          const next = p + 1;
          return next >= children.length ? 0 : next;
        }),
      intervalMs
    );
    return () => clearInterval(id);
  }, [intervalMs, children.length]);

  return (
    <div style={{ position: "relative", width: "100%", minWidth: "100px", minHeight: "100px" }}>
      {children.map((c, i) => (
        <div
          key={i}
          style={{
            position: visibleIndex == i ? "initial" : "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: i,
            width: "100%",
            display: visibleIndex == i ? "initial" : "none",
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};
