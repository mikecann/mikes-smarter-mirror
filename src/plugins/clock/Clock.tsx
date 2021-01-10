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
    <Vertical horizontalAlign="right">
      <Content style={{ fontSize: "2.5em", color: `#ddd` }}>
        {format(date, "iiii MMMM Do yyyy")}
      </Content>
      <Horizontal verticalAlign="top">
        <Vertical style={{ fontSize: "10em", lineHeight: "0.6em" }}>
          {format(date, "HH:mm")}
        </Vertical>
        <Vertical style={{ fontSize: "4em", lineHeight: "0.3em", color: `#eee` }}>
          {format(date, "ss")}
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
