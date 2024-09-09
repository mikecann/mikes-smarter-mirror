import * as React from "react";
import { Box, BoxProps } from "./Box";

interface Props extends BoxProps {}

export const Grid: React.FC<Props> = ({ style, ...rest }) => {
  return <Box style={{ display: "grid", ...style }} {...rest} />;
};
