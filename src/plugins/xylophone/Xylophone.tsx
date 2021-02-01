import * as React from "react";
import { ensure } from "../../utils/ensure";
import { MotionDetectionEngine } from "./MotionDetectionEngine";
import { Notes } from "./Notes";

interface Props {
  width: number;
  height: number;
}

const noteCount = 8;

export const Xylophone: React.FC<Props> = ({ width, height }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sourceCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const blendedCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = React.useState<MotionDetectionEngine>();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong getting user media!");
      });

    let exited = false;

    const widthPerNote = width / noteCount;
    const ratioOfNoteImage = widthPerNote / 75;

    const engine = new MotionDetectionEngine({
      video: ensure(videoRef.current, `missing video element`),
      blendedCanvas: ensure(blendedCanvasRef.current, `missing blended canvas element`),
      sourceCanvas: ensure(sourceCanvasRef.current, `missing source canvas element`),
      areaCount: noteCount,
      noteHeight: ratioOfNoteImage * 100,
    });

    setEngine(engine);

    const update = () => {
      if (exited) return;
      engine.update();
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => {
      exited = true;
      engine.destroy();
    };
  }, []);

  return (
    <div style={{ width, height, position: "relative", overflow: "hidden" }}>
      <canvas
        ref={sourceCanvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        width={width}
        height={height}
      />
      <canvas
        ref={blendedCanvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1, opacity: 0.5 }}
        width={width}
        height={height}
      />
      <video style={{ display: "none" }} ref={videoRef} autoPlay width={width} height={height} />
      {engine && <Notes width={width} noteCount={noteCount} engine={engine} />}
    </div>
  );
};
