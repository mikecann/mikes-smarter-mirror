import { Vertical } from "gls/lib";
import * as React from "react";

interface Props {
  children: React.ReactNode[];
  intervalMs: number;
}

export const Cycle: React.FC<Props> = ({ children, intervalMs }) => {
  const [it, setIt] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setIt((prev) => {
        if (prev >= children.length - 1) return 0;
        return prev + 1;
      });
    }, intervalMs);
    return () => {
      clearInterval(id);
    };
  }, [intervalMs]);

  return <>{children}</>;
};
