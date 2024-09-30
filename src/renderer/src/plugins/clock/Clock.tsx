import { format } from "date-fns";
import * as React from "react";
import { Vertical } from "../../components/Vertical";
import { Horizontal } from "../../components/Horizontal";

interface Props {}

export const Clock: React.FC<Props> = ({}) => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Vertical style={{ filter: `drop-shadow(2px 2px 4px #000000)`, fontSize: "0.7em", alignItems: "flex-start" }}>
      <div style={{ fontSize: "2em", color: `#ddd`, marginLeft: 5 }}>
        {format(date, "iiii MMMM dd yyyy")}
      </div>
      <Horizontal style={{ justifyContent: "flex-start" } } >
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
