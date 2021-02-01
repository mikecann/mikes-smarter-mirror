import { Horizontal } from "gls/lib";
import * as React from "react";
import { narray } from "../../utils/array";
import { MotionDetectionEngine } from "./MotionDetectionEngine";
import { Note } from "./Note";

interface Props {
  engine: MotionDetectionEngine;
  noteCount: number;
  width: number;
}

export const Notes: React.FC<Props> = ({ engine, noteCount, width }) => {
  const widthPerNote = width / noteCount;

  return (
    <Horizontal
      style={{ width: "100%", position: "absolute", top: 0, left: 0, zIndex: 2 }}
      spacing={0}
    >
      {narray(noteCount).map((index) => (
        <div style={{ width: widthPerNote }}>
          <Note key={index} engine={engine} index={index} />
        </div>
      ))}
    </Horizontal>
  );
};
