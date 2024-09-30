import * as React from "react";
import { Box, BoxProps } from "./Box";

interface Props extends BoxProps {}

export const Vertical: React.FC<Props> = ({ style, ...rest }) => {
  return <Box style={{ display: "flex", flexDirection: "column", ...style }} {...rest} />;
};
