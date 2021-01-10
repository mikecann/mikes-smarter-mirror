import React from "react";
import logo from "./logo.svg";
import "./App.css";
import fs from "fs";
import { Horizontal, Stretch, Vertical } from "gls/lib";
import { Clock } from "./plugins/clock/Clock";
import { Weather } from "./plugins/weather/Weather";
import { BattleTabsLogs } from "./plugins/battletabs-logs/BattleTabsLogs";

function App() {
  return (
    <Horizontal style={{ backgroundColor: "black", height: "100%", width: "100%" }}>
      <Vertical verticalAlign="bottom" style={{ height: "100%", overflow: "hidden", width: 1000 }}>
        <BattleTabsLogs />
      </Vertical>
      <Vertical horizontalAlign="right" style={{ padding: 10 }}>
        <Clock />
        <Stretch />
        <Weather />
      </Vertical>
      <Stretch />
    </Horizontal>
  );
}

export default App;
