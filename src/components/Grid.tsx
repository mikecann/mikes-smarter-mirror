import * as React from 'react';

interface Props extends  React.HTMLAttributes<HTMLDivElement> {}

export const Grid: React.FC<Props> = ({ style, ...rest }) => {
  return (
   <div style={{ display: "grid",  ...style }} {...rest} />
  );
};
