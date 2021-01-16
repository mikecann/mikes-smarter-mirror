import execa from "execa";
import { Stream } from "stream";
import kill from "tree-kill";

function emitLines(stream: Stream) {
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

const colorit = (color: string) => (text: string) => `<span style="color: ${color}">${text}</span>`;

type ColorFn = (text: string) => string;

const theme = {
  white: `#FDF6E3`,
  yellow: `#B58900`,
  red: `#DC322F`,
  blue: `#268BD2`,
  cyan: `#2AA198`,
  green: `#859900`,
};

export const startLogging = (log: (text: string) => any, newline = "<br />") =>
  restartRegularly(() => _startLogging(log, newline));

const _startLogging = (log: (text: string) => any, newline = "<br />") => {
  const execution = execa("heroku", ["logs", "--tail", "-a", "battletabs"]);
  const stream = execution.stdout!;

  let skips = 0;
  const skip = (color: ColorFn) => {
    log(color("."));
    skips++;
  };

  const logLine = (text: string) => {
    log(text + newline);
    //console.log(text);
  };

  const _log = (...args: any[]) => {
    if (skips) {
      log(newline);
      skips = 0;
    }
    logLine(args.map((o) => o + "").join(" "));
  };

  let lastColor = colorit(theme.white);

  stream.on("line", function (line: string): any {
    const groups = line.split(" ");

    if (line.includes("metrics-v2")) return skip(colorit(theme.green));
    if (line.includes("heroku[router]")) return skip(colorit(theme.cyan));

    if (groups.length) {
      const date = groups[0];
      const dyno = groups[1];
      const message = groups.slice(2).join(" ");

      let color = colorit(theme.white);

      if (message.toLowerCase().includes("error")) color = colorit(theme.red);
      else if (message.startsWith("at")) color = lastColor;
      else if (dyno.includes("web.")) color = colorit(theme.green);
      else if (dyno.includes("worker.")) color = colorit(theme.blue);
      else if (dyno.includes("heroku-redis")) color = colorit(theme.yellow);

      if (message.includes("[gameServer] executing")) return skip(color);
      if (message.includes("[gameServer] executed")) return skip(color);
      if (message.includes("[gameServer] client disconnected")) return skip(color);
      if (message.includes("[gameServer] client connected")) return skip(color);

      if (dyno.includes("heroku[")) return skip(colorit(theme.cyan));
      if (dyno.includes("heroku-redis")) return skip(colorit(theme.yellow));

      lastColor = color;

      _log(color(dyno + " " + message));
    } else {
      logLine(groups.join(" "));

      _log(colorit(theme.red)(line));
    }
  });

  emitLines(stream);

  return () => {
    console.log(`killing..`);
    kill(execution.pid, "SIGKILL", function (err) {
      console.log(`killed`, err);
    });
  };
};

const restartRegularly = (fn: () => () => void) => {
  let die: Function | null = null;

  const start = () => (die = fn());

  setInterval(() => {
    console.log(`restarting..`);
    if (die) die();
    start();
  }, 1000 * 60 * 20); // 20 mins

  start();
};
