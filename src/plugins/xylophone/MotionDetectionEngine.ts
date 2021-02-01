import { ensure } from "../../utils/ensure";
import { TypedEvent } from "../../utils/TypedEvent";

interface Options {
  video: HTMLVideoElement;
  sourceCanvas: HTMLCanvasElement;
  blendedCanvas: HTMLCanvasElement;
  areaCount?: number;
  detectionSensitivity?: number;
  noteHeight: number;
}

interface MotionEvent {
  areaIndex: number;
}

/*
  Much of this was borrowed from: https://github.com/soundstep/magic-xylophone
*/
export class MotionDetectionEngine {
  private lastImageData: ImageData | undefined;
  private contextSource: CanvasRenderingContext2D;
  private contextBlended: CanvasRenderingContext2D;
  private videoElement: HTMLVideoElement;
  private sourceCanvas: HTMLCanvasElement;
  private areaCount: number;
  private noteHeight: number;
  private detectionSensitivity: number;
  public onMotion = new TypedEvent<MotionEvent>();

  constructor({
    video,
    blendedCanvas,
    sourceCanvas,
    areaCount = 8,
    detectionSensitivity = 0.1,
    noteHeight,
  }: Options) {
    this.videoElement = video;
    this.sourceCanvas = sourceCanvas;
    this.areaCount = areaCount;
    this.noteHeight = noteHeight;
    this.detectionSensitivity = detectionSensitivity;
    this.contextSource = ensure(sourceCanvas.getContext("2d"));
    this.contextBlended = ensure(blendedCanvas.getContext("2d"));
    this.contextSource.translate(sourceCanvas.width, 0);
    this.contextSource.scale(-1, 1);

    console.log(`MotionDetectionEngine starting`, { noteHeight, areaCount, detectionSensitivity });
  }

  update() {
    if (this.videoElement.width == 0 || this.videoElement.height == 0) return;
    this.drawVideo();
    this.blend();
    this.checkAreas();
  }

  private drawVideo() {
    this.contextSource.drawImage(
      this.videoElement,
      0,
      0,
      this.videoElement.width,
      this.videoElement.height
    );
  }

  private blend() {
    var width = this.sourceCanvas.width;
    var height = this.sourceCanvas.height;
    // get webcam image data
    var sourceData = this.contextSource.getImageData(0, 0, width, height);
    // create an image if the previous image doesn’t exist
    if (!this.lastImageData)
      this.lastImageData = this.contextSource.getImageData(0, 0, width, height);
    // create a ImageData instance to receive the blended result
    var blendedData = this.contextSource.createImageData(width, height);
    // blend the 2 images
    this.differenceAccuracy(blendedData.data, sourceData.data, this.lastImageData.data);
    // draw the result in a canvas
    this.contextBlended.putImageData(blendedData, 0, 0);
    // store the current webcam image
    this.lastImageData = sourceData;
  }

  private fastAbs(value: number): number {
    // funky bitwise, equal Math.abs
    return (value ^ (value >> 31)) - (value >> 31);
  }

  private threshold(value: number): number {
    return value > 0x15 ? 0xff : 0;
  }
  private differenceAccuracy(
    target: Uint8ClampedArray,
    data1: Uint8ClampedArray,
    data2: Uint8ClampedArray
  ) {
    if (data1.length != data2.length) return null;
    var i = 0;
    while (i < data1.length * 0.25) {
      var average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
      var average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;
      var diff = this.threshold(this.fastAbs(average1 - average2));
      target[4 * i] = diff;
      target[4 * i + 1] = diff;
      target[4 * i + 2] = diff;
      target[4 * i + 3] = 0xff;
      ++i;
    }
  }

  private checkAreas() {
    // loop over the note areas
    for (var noteIndex = 0; noteIndex < this.areaCount; ++noteIndex) {
      const blendedData = this.contextBlended.getImageData(
        (1 / this.areaCount) * noteIndex * this.videoElement.width,
        0,
        this.videoElement.width / this.areaCount,
        this.noteHeight
      );

      let i = 0;
      let average = 0;

      let triggers = 0;

      // loop over the pixels
      for (let i = 0; i < blendedData.data.length / 4; i++) {
        const pixelIndex = i * 4;
        const r = blendedData.data[pixelIndex];
        const g = blendedData.data[pixelIndex + 1];
        const b = blendedData.data[pixelIndex + 2];
        const total = r + g + b;
        const average = total / 3;
        if (average >= 255 * this.detectionSensitivity) triggers++;
      }

      if (triggers > 50) {
        this.onMotion.emit({ areaIndex: noteIndex });
      }
    }
  }

  destroy() {}
}
