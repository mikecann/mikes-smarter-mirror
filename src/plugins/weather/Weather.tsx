import { Vertical } from "gls/lib";
import * as React from "react";
import { useTick } from "../../utils/useTick";
import { hoursToMs } from "../../utils/time";

interface Props {}

const url = `http://www.yr.no/place/Australia/Western_Australia/South_Perth/meteogram.png`;

export const Weather: React.FC<Props> = ({}) => {
  useTick(hoursToMs(2));

  return (
    <Vertical style={{ width: 810, height: 241, overflow: "hidden", position: "relative" }}>
      <img
        src={url + `?bust=${Math.random()}`}
        style={{
          filter: "invert(100%) grayscale(100%)",
          position: "absolute",
          top: -25,
          left: -7,
        }}
      />
    </Vertical>
  );
};
