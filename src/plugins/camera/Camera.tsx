import * as React from "react";

interface Props {}

export const Camera: React.FC<Props> = ({}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong getting user media!");
      });
  });

  return <video style={{ width: "100%", height: "100%" }} ref={videoRef} autoPlay />;
};
