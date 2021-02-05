import * as React from "react";
import { startLogging, OutputKind } from "./logsEssential";

interface Props {}

const solarizedTheme = {
  white: `#FDF6E3`,
  yellow: `#B58900`,
  red: `#DC322F`,
  blue: `#268BD2`,
  cyan: `#2AA198`,
  green: `#859900`,
};

const mikesTheme = {
  white: `#FDF6E3`,
  yellow: `#B7B327`,
  red: `#CC3333`,
  blue: `#34478B`,
  cyan: `#2C7898`,
  green: `#187018`,
};

const theme = mikesTheme;

const limit = (outputs: Output[], count = 40) => {
  let index = outputs.length - 1;
  let lines = 0;
  while (index > 0) {
    if (outputs[index].endLine) lines++;
    if (lines >= count) break;
    index--;
  }
  return outputs.slice(index);
};

interface Output {
  id: number;
  text: string;
  kind: OutputKind;
  endLine: boolean;
}

let id = 0;

export const BattleTabsLogs: React.FC<Props> = ({}) => {
  const [outputs, setOutputs] = React.useState<Output[]>([]);

  React.useEffect(
    () =>
      startLogging({
        onDot: (kind) =>
          setOutputs((prev) => limit([...prev, { id: id++, endLine: false, kind, text: `.` }])),
        onLine: (line, kind) =>
          setOutputs((prev) => limit([...prev, { id: id++, endLine: true, kind, text: line }])),
      }),
    []
  );

  const renderOutput = (output: Output) => {
    if (output.endLine)
      return (
        <div style={{ color: theme[output.kind] }} key={output.id}>
          {output.text}
        </div>
      );
    return (
      <span style={{ color: theme[output.kind] }} key={output.id}>
        {output.text}
      </span>
    );
  };

  return (
    <div
      style={{
        fontSize: "0.8em",
        userSelect: "none",
        fontFamily: "'Ubuntu Mono', monospace",
      }}
    >
      {outputs.map(renderOutput)}
    </div>
  );
};
