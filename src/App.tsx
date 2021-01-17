import React from "react";
import { Horizontal, Stretch, Vertical } from "gls/lib";
import { Clock } from "./plugins/clock/Clock";
import { Weather } from "./plugins/weather/Weather";
import { cssRaw } from "typestyle";
import { BattleTabsLogs } from "./plugins/battletabs-logs/BattleTabsLogs";
import { MainView } from "./MainView";

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
  return <MainView />;
};

export default App;
