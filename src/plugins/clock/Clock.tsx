import { format } from "date-fns";
import { Content, Horizontal, Vertical } from "gls/lib";
import * as React from "react";

interface Props {}

export const Clock: React.FC<Props> = ({}) => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Vertical horizontalAlign="left" style={{ filter: `drop-shadow(2px 2px 4px #000000)` }}>
      <Content style={{ fontSize: "2em", color: `#ddd`, marginLeft: 5 }}>
        {format(date, "iiii MMMM Do yyyy")}
      </Content>
      <Horizontal verticalAlign="top">
        <Vertical style={{ fontSize: "8em", lineHeight: "0.6em" }}>
          {format(date, "HH:mm")}
        </Vertical>
        <Vertical style={{ fontSize: "3em", lineHeight: "0.3em", color: `#eee` }}>
          {format(date, "ss")}
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
