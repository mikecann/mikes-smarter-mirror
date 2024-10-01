import { format } from "date-fns";
import * as React from "react";
import { Vertical } from "../../components/Vertical";
import { Horizontal } from "../../components/Horizontal";

interface Props {}

export const BattleTabsDash: React.FC<Props> = ({}) => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <iframe style={{ width: "100%", height: "100%" }} src="https://app.axiom.co/gangbusters-wmfo/stream/fly_battletabs" />
  );
};
