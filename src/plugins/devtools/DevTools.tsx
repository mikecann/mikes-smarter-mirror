import * as React from "react";

interface Props {}

var win = (global as any).nw.Window.get();

export const DevTools: React.FC<Props> = ({}) => {
  const ref = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    win.showDevTools(ref.current);
  }, []);

  return null;
};
