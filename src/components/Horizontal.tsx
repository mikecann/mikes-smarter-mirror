import * as React from "react";
import { Box, BoxProps } from "./Box";

interface Props extends BoxProps {}

export const Horizontal: React.FC<Props> = ({ style, ...rest }) => {
  return <Box style={{ display: "flex", flexDirection: "row", ...style }} {...rest} />;
};
