import * as React from "react";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Box: React.FC<BoxProps> = ({ style, ...rest }) => {
  return (
    <div
      style={{
        ...style,
      }}
      {...rest}
    />
  );
};
