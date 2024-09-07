import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Horizontal: React.FC<Props> = ({ style, ...rest }) => {
  return <div style={{ display: "flex", flexDirection: "column", ...style }} {...rest} />;
};
