import { useEffect } from "react";
import { window as W } from "@neutralinojs/lib";
import { Box } from "./components/Box";
import { Clock } from "./plugins/clock/Clock";
import { JoshieVids } from "./plugins/joshie-vids/JoshieVids";
import { Weather } from "./plugins/weather/Weather";
import { iife } from "./utils/misc";

export default function App() {
  // This is part of "Eye protection" feature
  // By default window is starting with white background (changing HTML background color does not help)
  // So it causes a flash of white screen when the app is starting
  // I set app window to be hidden by default and then show it after React is loaded
  // Dev tools (if enabled) will show up before the main window is shown
  useEffect(() => {
    iife(async () => {
      await W.show();
      if (import.meta.env.VITE_IS_PROD != "true") return;
      await W.setFullScreen();
    }).catch((e) => console.error(`Error in useEffect`, e));
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
      <Box style={{ position: "absolute", top: "0px", right: "0px", height: "100%" }}>
        <JoshieVids />
      </Box>
      <Box style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Clock />
      </Box>
      <Box style={{ position: "absolute", bottom: "00px", left: "00px" }}>
        <Weather />
      </Box>
      <Box style={{ position: "absolute", top: "20px", right: "20px" }}>
        {/* <AutoUpdater /> */}
      </Box>
    </Box>
  );
}
