import * as React from "react";
import * as si from "systeminformation";
import { ProgressBar } from "./ProgressBar";
import {Vertical} from '../../components/Vertical';
import { Horizontal } from "../../components/Horizontal";
import { Grid } from "../../components/Grid";

interface Props {}

export const SystemStats: React.FC<Props> = ({}) => {
  const [load, setLoad] = React.useState<si.Systeminformation.CurrentLoadData>();
  const [cpuTemp, setCpuTemp] = React.useState<si.Systeminformation.CpuTemperatureData>();
  const [mem, setMem] = React.useState<si.Systeminformation.MemData>();

  React.useEffect(() => {
    const check = () => {
      si.cpuTemperature().then(setCpuTemp).catch(console.error);
      si.currentLoad().then(setLoad).catch(console.error);
      si.mem().then(setMem).catch(console.error);
    };

    const id = setInterval(check, 1000);

    check();

    return () => clearInterval(id);
  }, []);

  const memUsed = mem && mem.used ? mem.used : 0;
  const memTotal = mem && mem.total ? mem.total : 1000;

  return (
        <Vertical style={{ fontSize: "0.6rem", gap: "5px" }}>
      <Horizontal style={{ gap: "0", justifyContent: "center" }}>
        <div style={{ width: 40 }}>CPUs:</div>
        <Grid  style={{ width: 300, "gap": "2px" }}>
          {load?.cpus.map((cpu, i) => (
            <ProgressBar key={i} width={50} progressPercent={Math.floor(cpu.load)} />
          ))}
        </Grid>
      </Horizontal>
      <Horizontal style={{ gap: "0", justifyContent: "center" }}>
        <div style={{ width: 40 }}>Temp:</div>
        <div>{cpuTemp?.main}</div>
      </Horizontal>
      <Horizontal style={{ gap: "0", justifyContent: "center" }}>
        <div style={{ width: 40 }}>Mem:</div>
        <ProgressBar width={50} progressPercent={Math.floor((memUsed / memTotal) * 100)} />
      </Horizontal>
    </Vertical>
  );
};
