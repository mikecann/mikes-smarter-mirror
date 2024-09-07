import * as React from 'react';

interface Props extends  React.HTMLAttributes<HTMLDivElement> {}

export const Vertical: React.FC<Props> = ({ style, ...rest }) => {
  return (
   <div style={{ display: "flex", "flexDirection": "row",  ...style }} {...rest} />
  );
};
