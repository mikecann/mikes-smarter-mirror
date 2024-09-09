import { Signal } from "./Signal";
import { expect, it } from "vitest";

it("works", () => {
  let listener1Called = false;
  let listener2Called = false;
  const signal = new Signal<string>();
  signal.add((s) => {
    expect(s).toBe("hello");
    listener1Called = true;
  });
  signal.add(() => (listener2Called = true));
  signal.dispatch("hello");
  expect(listener1Called).toBe(true);
  expect(listener2Called).toBe(true);
});

it("allows unlistening", () => {
  let listener1Called = false;
  let listener2Called = false;
  const signal = new Signal<string>();
  signal.add(() => (listener1Called = true));
  const unlisten = signal.add(() => (listener2Called = true));
  unlisten();
  signal.dispatch("hello");
  expect(listener1Called).toBe(true);
  expect(listener2Called).toBe(false);
});

it("allows listening once", () => {
  let listener1Called = 0;
  let listener2Called = 0;
  let listener3Called = 0;
  const signal = new Signal<string>();
  signal.add(() => listener1Called++);
  signal.addOnce(() => listener2Called++);
  signal.add(() => listener3Called++);
  signal.dispatch("hello");
  signal.dispatch("hello");
  signal.dispatch("hello");
  expect(listener1Called).toBe(3);
  expect(listener2Called).toBe(1);
  expect(listener1Called).toBe(3);
});

it("can clear", () => {
  let listener1Called = 0;
  const signal = new Signal<string>();
  signal.add(() => listener1Called++);
  signal.clear();
  signal.dispatch("hello");
  expect(listener1Called).toBe(0);
});
