import * as React from "react";
import { startLogging } from "./logsEssential";

interface Props {}

const newline = `<br/>`;

const limitLines = (text: string, count = 130) => {
  const lines = text.split(newline);
  return lines.slice(lines.length - count).join(newline);
};

export const BattleTabsLogs: React.FC<Props> = ({}) => {
  const [text, setText] = React.useState(``);

  React.useEffect(() => {
    return startLogging((txt) => setText((prev) => limitLines(prev + txt)), newline);
  }, []);

  return (
    <div
      style={{ fontSize: "0.8em", userSelect: "none" }}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};
