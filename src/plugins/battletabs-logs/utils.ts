import { Stream } from "stream";

export const restartRegularly = (fn: () => () => void) => {
  let die: Function | null = null;

  const start = () => (die = fn());

  const id = setInterval(() => {
    console.log(`restarting..`);
    if (die) die();
    start();
  }, 1000 * 60 * 20); // 20 mins

  start();

  return () => {
    clearInterval(id);
    if (die) die();
  };
};

export function readAndEmitLines(stream: Stream) {
  var backlog = "";
  stream.on("data", function (data) {
    backlog += data;
    var n = backlog.indexOf("\n");
    // got a \n? emit one or more 'line' events
    while (~n) {
      stream.emit("line", backlog.substring(0, n));
      backlog = backlog.substring(n + 1);
      n = backlog.indexOf("\n");
    }
  });
  stream.on("end", function () {
    if (backlog) {
      stream.emit("line", backlog);
    }
  });
}
