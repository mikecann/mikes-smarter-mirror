import execa from "execa";
import kill from "tree-kill";
import { restartRegularly, readAndEmitLines } from "./utils";

export type OutputKind = `white` | `yellow` | `red` | `blue` | `cyan` | `green`;

interface Options {
  onLine: (line: string, kind: OutputKind) => any;
  onDot: (kind: OutputKind) => any;
}

export const startLogging = ({ onDot, onLine }: Options) =>
  restartRegularly(() => {
    const execution = execa("heroku", ["logs", "--tail", "-a", "battletabs"]);
    const stream = execution.stdout!;

    let lastColor: OutputKind = `white`;

    stream.on("line", function (line: string): any {
      const groups = line.split(" ");

      if (line.includes("metrics-v2")) return onDot(`green`);
      if (line.includes("heroku[router]")) return onDot(`cyan`);

      if (groups.length) {
        const date = groups[0];
        const dyno = groups[1].replace(`[39m`, ``).replace(`[22m`, ``);
        const message = groups.slice(2).join(" ").replace(`[39m`, ``);

        let color: OutputKind = `white`;

        if (message.toLowerCase().includes("error")) color = `red`;
        else if (message.startsWith("at")) color = lastColor;
        else if (dyno.includes("web.")) color = `green`;
        else if (dyno.includes("worker.")) color = `blue`;
        else if (dyno.includes("heroku-redis")) color = `yellow`;

        if (message.includes("[gameServer] executing")) return onDot(color);
        if (message.includes("[gameServer] executed")) return onDot(color);
        if (message.includes("[gameServer] client disconnected")) return onDot(color);
        if (message.includes("[gameServer] client connected")) return onDot(color);

        if (dyno.includes("heroku[")) return onDot(`cyan`);
        if (dyno.includes("heroku-redis")) return onDot(`yellow`);

        lastColor = color;

        onLine(dyno + " " + message, color);
      } else {
        //logLine(groups.join(" "));
        onLine(line, `red`);
      }
    });

    readAndEmitLines(stream);

    // execution.catch((e) => {
    //   console.error(`error starting heroku cli`, e);
    // });

    return () => {
      console.log(`killing..`);
      kill(execution.pid, "SIGKILL", function (err) {
        console.log(`killed`, err);
      });
    };
  });
