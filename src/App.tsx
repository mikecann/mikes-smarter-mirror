import { useEffect, useState } from "react";
import { app, window as W } from "@neutralinojs/lib";
import { Box } from "./components/Box";
import { Clock } from "./plugins/clock/Clock";

const shutdownApp = () => app.exit();

export default function App() {
  const [count, setCount] = useState(0);

  // This is part of "Eye protection" feature
  // By default window is starting with white background (changing HTML background color does not help)
  // So it causes a flash of white screen when the app is starting
  // I set app window to be hidden by default and then show it after React is loaded
  // Dev tools (if enabled) will show up before the main window is shown
  useEffect(() => {
    W.show();
  }, []);

  return (
    <Box
      style={{
        position: "relative",
        padding: "0px",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Clock />
      </Box>
    </Box>
  );
}
