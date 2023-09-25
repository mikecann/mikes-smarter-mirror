import * as React from "react";
import { Horizontal, Stretch, Vertical } from "gls/lib";
import { Clock } from "./plugins/clock/Clock";
import { Weather } from "./plugins/weather/Weather";
import { BattleTabsLogs } from "./plugins/battletabs-logs/BattleTabsLogs";
import { News } from "./plugins/news/News";
import { config } from "./config";
import { SystemStats } from "./plugins/system-stats/SystemStats";
import { JoshieVids } from "./plugins/joshie-vids/JoshieVids";
import { Cycle } from "./plugins/cycle/Cycle";

interface Props {}

const xylophoneSizeRatio = parseFloat(config.XYLOPHONE_SIZE_RATIO);

export const MainView: React.FC<Props> = ({}) => {
  return (
    <div style={{ height: "100%", width: "100%", backgroundColor: "black", position: "relative" }}>
      <Horizontal
        style={{ position: "absolute", top: 20, left: 20, bottom: 20, right: 20, zIndex: 2 }}
      >
        <Vertical
          horizontalAlign="left"
          verticalAlign="bottom"
          style={{ padding: 10, position: "relative", width: "50%" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
            <Clock />
          </div>
          {/* <Stretch verticalAlign="bottom" style={{ overflow: "hidden", width: 800 }}>
            <BattleTabsLogs />
          </Stretch> */}
          <Weather />
          <News />
        </Vertical>
        <Vertical horizontalAlign="right" style={{ padding: 0, flex: 1 }} spacing={0}>
          {/* <Xylophone width={800 * xylophoneSizeRatio} height={600 * xylophoneSizeRatio} /> */}
          <JoshieVids />
        </Vertical>
        {/* <DevTools /> */}
        <div style={{ position: "absolute", top: 0, left: 500 }}>
          <SystemStats />
        </div>
      </Horizontal>
    </div>
  );
};
