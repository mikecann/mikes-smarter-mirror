import * as React from "react";
import { MotionDetectionEngine } from "./MotionDetectionEngine";
//import { Howl } from "howler";

interface Props {
  index: number;
  engine: MotionDetectionEngine;
}

export const Note: React.FC<Props> = ({ index, engine }) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    // const sound = new Howl({
    //   src: [`/plugins/xylophone/assets/sounds/note${index + 1}.ogg`],
    //   onloaderror: (num, err) => console.error(`error loading note ${index}`, err),
    // });

    const playSound = () => {
      const el = document.createElement("audio");
      el.src = `/plugins/xylophone/assets/sounds/note${index + 1}.ogg`;
      el.autoplay = true;
      el.addEventListener("ended", () => el.remove());
      document.body.append(el);
    };

    let isReady = true;

    const dispose = engine.onMotion.on(({ areaIndex }) => {
      if (areaIndex != index) return;
      if (!isReady) return;

      playSound();

      if (imgRef.current) {
        imgRef.current.style.transition = "filter 0s ease";
        imgRef.current.style.filter = "brightness(2)";
      }

      // Throttle it
      isReady = false;
      setTimeout(() => {
        isReady = true;
        if (imgRef.current) {
          imgRef.current.style.transition = "filter 0.2s ease";
          imgRef.current.style.filter = "brightness(1)";
        }
      }, 400);
    });

    return dispose;
  }, [engine]);

  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ width: "100%", position: "absolute", top: 0, left: 0 }}
        src={`/plugins/xylophone/assets/images/bar.png`}
      />
      <img
        style={{ width: "100%", position: "absolute", top: 0, left: 0 }}
        ref={imgRef}
        src={`/plugins/xylophone/assets/images/note${index + 1}.png`}
      />
      <img
        style={{ width: "100%", position: "absolute", top: 0, left: 0 }}
        src={`/plugins/xylophone/assets/images/peg.png`}
      />
    </div>
  );
};
