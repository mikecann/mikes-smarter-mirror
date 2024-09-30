import { arrayify } from "../array";

type Listener<TData = any> = (data: TData) => unknown;

type SavedListener<TData = any> = { listener: Listener<TData>; once: boolean };

export type Unlisten = () => any;

export const createUnlistener = (removerOrRemovers: Unlisten | Unlisten[]) => () =>
  arrayify(removerOrRemovers).forEach((r) => r());

export class Signal<TData = void> {
  private listeners: SavedListener<TData>[] = [];

  constructor() {}

  public add = (listener: Listener<TData>): Unlisten => {
    this.listeners.push({ listener, once: false });
    return () => {
      // would be faster with a map but its probably okay
      this.listeners = this.listeners.filter((l) => l.listener != listener);
    };
  };

  public addOnce = (listener: Listener<TData>): Unlisten => {
    this.listeners.push({ listener, once: true });
    return () => {
      // would be faster with a map but its probably okay
      this.listeners = this.listeners.filter((l) => l.listener != listener);
    };
  };

  public clear = () => {
    this.listeners = [];
  };

  public dispatch = (data: TData): (unknown | Promise<unknown>)[] => {
    const results: unknown[] = [];
    for (let i = 0; i < this.listeners.length; i++) {
      const listener = this.listeners[i]!;
      results.push(listener.listener(data));
      if (listener.once) {
        this.listeners.splice(i, 1);
        i--;
      }
    }
    return results;
  };
}
