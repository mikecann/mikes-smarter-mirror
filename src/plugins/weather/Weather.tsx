import { Vertical } from "gls/lib";
import * as React from "react";

interface Props {}

const url = `http://www.yr.no/place/Australia/Western_Australia/South_Perth/meteogram.png`;

export const Weather: React.FC<Props> = ({}) => {
  // const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // React.useEffect(() => {
  //   let exited = false;

  //   const tick = () => {
  //     if (!canvasRef.current) return;

  //     const image = document.createElement("img");
  //     image.src = `${url}?r=${Math.random()}`;
  //     image.onload = () => {
  //       if (exited) return;
  //       if (!canvasRef.current) return;

  //       const context = canvasRef.current.getContext("2d");
  //       if (!context) return;

  //       context.drawImage(image, -5, -25, 828, 272);
  //       console.log("🚀 ~ file: Weather.tsx ~ line 27 ~ tick ~ image", image);

  //       //this.setState({ image });
  //     };
  //   };

  //   const timer = setInterval(tick, 1000 * 60 * 60 * 12);

  //   tick();

  //   return () => {
  //     clearInterval(timer);
  //     exited = true;
  //   };
  // });

  return (
    <Vertical>
      {/* <canvas
        ref={canvasRef}
        style={{
          filter: "invert(100%) grayscale(100%)",
          width: 828,
          height: 272,
        }}
      /> */}
      <img
        src={url}
        style={{
          filter: "invert(100%) grayscale(100%)",
        }}
      />
    </Vertical>
  );
};
