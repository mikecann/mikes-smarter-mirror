import * as React from "react";
import { Horizontal, Stretch, Vertical } from "gls/lib";
import { Clock } from "./plugins/clock/Clock";
import { Weather } from "./plugins/weather/Weather";
import { BattleTabsLogs } from "./plugins/battletabs-logs/BattleTabsLogs";
import { News } from "./plugins/news/News";

interface Props {}

export const MainView: React.FC<Props> = ({}) => {
  return (
    <Horizontal style={{ backgroundColor: "black", height: "100%", width: "100%" }}>
      <Vertical horizontalAlign="left" style={{ padding: 10, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <Clock />
        </div>
        <Stretch verticalAlign="bottom" style={{ overflow: "hidden", width: 800 }}>
          <BattleTabsLogs />
        </Stretch>
        <Weather />
      </Vertical>
      <Stretch />
      <Vertical verticalAlign="top" horizontalAlign="right" style={{ padding: 10 }}>
        <News />
      </Vertical>
    </Horizontal>
  );
};
