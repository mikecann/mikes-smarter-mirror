import { Vertical } from "gls/lib";
import * as React from "react";
import { useTick } from "../../utils/useTick";
import { hoursToMs } from "../../utils/time";

interface Props {}

const url = `https://www.yr.no/en/content/2-2075265/meteogram.svg`;

const fullSize = {
  w: 792,
  h: 391,
};

const offset = {
  w: 0,
  h: 80,
};

export const Weather: React.FC<Props> = ({}) => {
  useTick(hoursToMs(2));

  return (
    <Vertical
      style={{
        width: fullSize.w - offset.w,
        height: fullSize.h - offset.h,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={url + `?bust=${Math.random()}`}
        style={{
          filter: "invert(100%) grayscale(100%)",
          position: "absolute",
          top: -offset.h,
          left: -offset.w,
        }}
      />
    </Vertical>
  );
};
