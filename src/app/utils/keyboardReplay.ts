export type modifiers = "shift" | "caps";

export type KeyAction = {
  key: string;
  modifiers: Record<modifiers, boolean>;
  time: number;
  type: "keydown" | "keyup";
};

export type KeyReplay = KeyAction[];

export type KeyReplayOptions = {
  delay: number;
  speed: number;
  loop: boolean;
  onComplete: () => void;
};

export function playReplay(
  replay: KeyReplay,
  options?: Partial<KeyReplayOptions>
) {
  const { delay, speed, loop } = {
    delay: 0,
    speed: 1,
    loop: false,
    ...options,
  };

  let index = 0,
    timeout = 0,
    stack = 1;

  function play() {
    stack--;

    const action = replay[index];
    const nextAction = replay[index + 1];

    if (action) {
      const time = nextAction ? nextAction.time - action.time : 0;
      timeout = window.setTimeout(play, time / speed);
      stack++;
      index++;
      window.dispatchEvent(
        new KeyboardEvent(action.type, {
          key: action.key,
          shiftKey: action.modifiers["shift"],
          modifierCapsLock: action.modifiers["caps"],
        })
      );
    } else if (loop) {
      index = 0;
      timeout = window.setTimeout(play, delay);
    }

    if (stack === 0) options?.onComplete?.();
  }

  play();

  return () => {
    window.clearTimeout(timeout);
  };
}
