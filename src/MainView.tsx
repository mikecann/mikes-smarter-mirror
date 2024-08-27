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
import { Tides } from "./plugins/tides/Tides";

interface Props {}

const xylophoneSizeRatio = parseFloat(config.XYLOPHONE_SIZE_RATIO);

export const MainView: React.FC<Props> = ({}) => {
  return (
    <div style={{ height: "100%", width: "100%", backgroundColor: "black", position: "relative" }}>
       <div style={{ position: "absolute", height: "100%", top: "0px", right: "0px" }}>
          <JoshieVids />
        </div>
      <Horizontal
        style={{ position: "absolute", top: 20, left: 20, bottom: 20, right: 20, zIndex: 2 }}
      >
       
       <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
            <Clock />
          </div>
          
          <div style={{ position: "absolute", top: 150, left: 0 }}>
          <Weather />

          </div>

          
          <div style={{ position: "absolute", bottom: 0, left: 0, minWidth: "400px" }}>
              <Tides />
              
            {/* <Cycle> */}
              {/* <News />  */}
                        
            {/* </Cycle> */}
          </div>  
       
        {/* <DevTools /> */}
        <div style={{ position: "absolute", top: 0, left: 300 }}>
          <SystemStats />
        </div>

      </Horizontal>
     
    </div>
  );
};
