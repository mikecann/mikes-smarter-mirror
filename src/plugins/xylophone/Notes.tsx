import * as React from "react";
import { narray } from "../../utils/array";
import { MotionDetectionEngine } from "./MotionDetectionEngine";
import { Note } from "./Note";
import {Horizontal} from '../../components/Horizontal';

interface Props {
  engine: MotionDetectionEngine;
  noteCount: number;
  width: number;
}

export const Notes: React.FC<Props> = ({ engine, noteCount, width }) => {
  const widthPerNote = width / noteCount;

  return (
    <Horizontal
      style={{ width: "100%", position: "absolute", top: 0, left: 0, zIndex: 2, gap: 0 }}
    >
      {narray(noteCount).map((index) => (
        <div key={index} style={{ width: widthPerNote }}>
          <Note engine={engine} index={index} />
        </div>
      ))}
    </Horizontal>
  );
};
