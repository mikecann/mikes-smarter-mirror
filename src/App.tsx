import React from "react";
import { Horizontal, Stretch, Vertical } from "gls/lib";
import { Clock } from "./plugins/clock/Clock";
import { Weather } from "./plugins/weather/Weather";
import { cssRaw } from "typestyle";
import { BattleTabsLogs } from "./plugins/battletabs-logs/BattleTabsLogs";

cssRaw(`
html {
  height: 100%;
  color: white;
}

body {
  margin: 0;
  height: 100%;
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  height: 100%;
}
`);

const App = () => {
  return (
    <Horizontal style={{ backgroundColor: "black", height: "100%", width: "100%" }}>
      <Vertical verticalAlign="bottom" style={{ height: "100%", overflow: "hidden", width: 1000 }}>
        <BattleTabsLogs />
      </Vertical>
      <Stretch />
      <Vertical horizontalAlign="right" style={{ padding: 10 }}>
        <Clock />
        <Stretch />
        <Weather />
      </Vertical>
    </Horizontal>
  );
};

export default App;
