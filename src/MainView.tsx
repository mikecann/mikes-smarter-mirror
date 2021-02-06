import * as React from "react";
import { Horizontal, Stretch, Vertical } from "gls/lib";
import { Clock } from "./plugins/clock/Clock";
import { Weather } from "./plugins/weather/Weather";
import { BattleTabsLogs } from "./plugins/battletabs-logs/BattleTabsLogs";
import { News } from "./plugins/news/News";
import { Xylophone } from "./plugins/xylophone/Xylophone";
import { DevTools } from "./plugins/devtools/DevTools";
import { config } from "./config";
import { SystemStats } from "./plugins/system-stats/SystemStats";

interface Props {}

const xylophoneSizeRatio = parseFloat(config.XYLOPHONE_SIZE_RATIO);

export const MainView: React.FC<Props> = ({}) => {
  return (
    <div style={{ height: "100%", width: "100%", backgroundColor: "black", position: "relative" }}>
      <Horizontal
        style={{ position: "absolute", top: 20, left: 20, bottom: 20, right: 20, zIndex: 2 }}
      >
        <Vertical horizontalAlign="left" style={{ padding: 10, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
            <Clock />
          </div>
          <Stretch verticalAlign="bottom" style={{ overflow: "hidden", width: 800 }}>
            <BattleTabsLogs />
          </Stretch>
          <Weather />
        </Vertical>
        <Stretch />
        <Vertical verticalAlign="bottom" horizontalAlign="right" style={{ padding: 10 }}>
          <Xylophone width={800 * xylophoneSizeRatio} height={600 * xylophoneSizeRatio} />
          <Stretch />
          <News />
        </Vertical>
        {/* <DevTools /> */}
        <div style={{ position: "absolute", top: 0, left: 500 }}>
          <SystemStats />
        </div>
      </Horizontal>
    </div>
  );
};
