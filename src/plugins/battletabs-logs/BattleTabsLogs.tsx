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

const limit = (element: HTMLDivElement, count = 100) => {
  //let index = element.childElementCount - 1;
  // let lines = 0;
  // while (index > 0) {
  //   const child = element.childNodes[index];
  //   if (child. == "div") lines++;
  //   if (lines >= count) break;
  //   index--;
  // }
  // console.log("🚀 ~ file: BattleTabsLogs.tsx ~ line 28 ~ limit ~ index", index);
  //return outputs.slice(index);
};

const maxElements = 500;

interface Output {
  id: number;
  text: string;
  kind: OutputKind;
  endLine: boolean;
}

const getLineElement = (line: string, kind: OutputKind) => {
  const div = document.createElement("div");
  div.innerText = line;
  div.style.color = theme[kind];
  return div;
};

const getDotElement = (kind: OutputKind) => {
  const div = document.createElement("span");
  div.innerText = `.`;
  div.style.color = theme[kind];
  return div;
};

export const BattleTabsLogs: React.FC<Props> = ({}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
    () =>
      startLogging({
        onDot: (kind) => {
          if (!containerRef.current) return;
          containerRef.current!.appendChild(getDotElement(kind));
          if (containerRef.current!.childElementCount >= maxElements)
            containerRef.current!.firstChild?.remove();
        },
        onLine: (line, kind) => {
          if (!containerRef.current) return;
          containerRef.current!.appendChild(getLineElement(line, kind));
          if (containerRef.current!.childElementCount >= maxElements)
            containerRef.current!.firstChild?.remove();
        },
      }),
    []
  );

  return (
    <div
      ref={containerRef}
      style={{
        fontSize: "0.8em",
        userSelect: "none",
        fontFamily: "'Ubuntu Mono', monospace",
      }}
    ></div>
  );
};
