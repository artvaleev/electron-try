type KeyCode =
  | `KeyA`
  | `KeyB`
  | `KeyC`
  | `KeyD`
  | `KeyE`
  | `KeyF`
  | `KeyG`
  | `KeyH`
  | `KeyI`
  | `KeyJ`
  | `KeyK`
  | `KeyL`
  | `KeyM`
  | `KeyN`
  | `KeyO`
  | `KeyP`
  | `KeyQ`
  | `KeyR`
  | `KeyS`
  | `KeyT`
  | `KeyU`
  | `KeyV`
  | `KeyW`
  | `KeyX`
  | `KeyY`
  | `KeyZ`
  | `BracketLeft`
  | `Backslash`
  | `BracketRight`
  | `Semicolon`
  | `Quote`
  | `Comma`
  | `Period`
  | `Slash`
  | `Backquote`
  | `Digit0`
  | `Digit1`
  | `Digit2`
  | `Digit3`
  | `Digit4`
  | `Digit5`
  | `Digit6`
  | `Digit7`
  | `Digit8`
  | `Digit9`
  | `Minus`
  | `Equal`
  | `Backspace`
  | `Space`
  | `Tab`
  | `Escape`
  | `Delete`;

interface KeyMapping {
  shift: boolean;
  ctrl: boolean;
  code: KeyCode;
  value: string;
}

const keysMap: KeyMapping[] = [
  { code: `KeyA`, shift: false, ctrl: true, value: `\x01` }, // SOH
  { code: `KeyB`, shift: false, ctrl: true, value: `\x02` }, // STX
  { code: `KeyC`, shift: false, ctrl: true, value: `\x03` }, // ETX
  { code: `KeyD`, shift: false, ctrl: true, value: `\x04` }, // EOT
  { code: `KeyE`, shift: false, ctrl: true, value: `\x05` }, // ENQ
  { code: `KeyF`, shift: false, ctrl: true, value: `\x06` }, // ACK
  { code: `KeyG`, shift: false, ctrl: true, value: `\x07` }, // BEL
  { code: `Backspace`, shift: false, ctrl: false, value: `\x08` }, // BS
  { code: `Tab`, shift: false, ctrl: false, value: `\x09` }, // TAB
  { code: `KeyJ`, shift: false, ctrl: true, value: `\x0a` }, // LF
  { code: `KeyK`, shift: false, ctrl: true, value: `\x0b` }, // VT
  { code: `KeyL`, shift: false, ctrl: true, value: `\x0c` }, // EF
  // 0x0d (CR) - no key match
  { code: `KeyN`, shift: false, ctrl: true, value: `\x0e` }, // SO
  { code: `KeyO`, shift: false, ctrl: true, value: `\x0f` }, // SI
  { code: `KeyP`, shift: false, ctrl: true, value: `\x10` }, // DLE
  { code: `KeyQ`, shift: false, ctrl: true, value: `\x11` }, // DC1
  { code: `KeyR`, shift: false, ctrl: true, value: `\x12` }, // DC2
  { code: `KeyS`, shift: false, ctrl: true, value: `\x13` }, // DC3
  { code: `KeyT`, shift: false, ctrl: true, value: `\x14` }, // DC4
  { code: `KeyU`, shift: false, ctrl: true, value: `\x15` }, // NAK
  { code: `KeyV`, shift: false, ctrl: true, value: `\x16` }, // SYN
  { code: `KeyW`, shift: false, ctrl: true, value: `\x17` }, // ETB
  { code: `KeyX`, shift: false, ctrl: true, value: `\x18` }, // CAN
  { code: `KeyY`, shift: false, ctrl: true, value: `\x19` }, // EM
  { code: `KeyZ`, shift: false, ctrl: true, value: `\x1a` }, // SUB
  { code: `Escape`, shift: false, ctrl: true, value: `\x1b` }, // ESC
  { code: `Backslash`, shift: false, ctrl: true, value: `\x1c` }, // FS
  { code: `BracketRight`, shift: false, ctrl: true, value: `\x1d` }, // GS
  { code: `Digit6`, shift: false, ctrl: true, value: `\x1e` }, // RS
  { code: `Minus`, shift: false, ctrl: true, value: `\x1f` }, // US
  { code: `Space`, shift: false, ctrl: false, value: ` ` },
  { code: `Digit1`, shift: true, ctrl: false, value: `!` },
  { code: `Quote`, shift: true, ctrl: false, value: `"` },
  { code: `Digit3`, shift: true, ctrl: false, value: `#` },
  { code: `Digit4`, shift: true, ctrl: false, value: `$` },
  { code: `Digit5`, shift: true, ctrl: false, value: `%` },
  { code: `Digit7`, shift: true, ctrl: false, value: `&` },
  { code: `Quote`, shift: false, ctrl: false, value: `'` },
  { code: `Digit9`, shift: true, ctrl: false, value: `(` },
  { code: `Digit0`, shift: true, ctrl: false, value: `)` },
  { code: `Digit8`, shift: true, ctrl: false, value: `*` },
  { code: `Equal`, shift: true, ctrl: false, value: `+` },
  { code: `Comma`, shift: false, ctrl: false, value: `,` },
  { code: `Minus`, shift: false, ctrl: false, value: `-` },
  { code: `Period`, shift: false, ctrl: false, value: `.` },
  { code: `Slash`, shift: false, ctrl: false, value: `/` },
  { code: `Digit0`, shift: false, ctrl: false, value: `0` },
  { code: `Digit1`, shift: false, ctrl: false, value: `1` },
  { code: `Digit2`, shift: false, ctrl: false, value: `2` },
  { code: `Digit3`, shift: false, ctrl: false, value: `3` },
  { code: `Digit4`, shift: false, ctrl: false, value: `4` },
  { code: `Digit5`, shift: false, ctrl: false, value: `5` },
  { code: `Digit6`, shift: false, ctrl: false, value: `6` },
  { code: `Digit7`, shift: false, ctrl: false, value: `7` },
  { code: `Digit8`, shift: false, ctrl: false, value: `8` },
  { code: `Digit9`, shift: false, ctrl: false, value: `9` },
  { code: `Semicolon`, shift: true, ctrl: false, value: `:` },
  { code: `Semicolon`, shift: false, ctrl: false, value: `;` },
  { code: `Comma`, shift: true, ctrl: false, value: `<` },
  { code: `Equal`, shift: false, ctrl: false, value: `=` },
  { code: `Period`, shift: true, ctrl: false, value: `>` },
  { code: `Slash`, shift: true, ctrl: false, value: `?` },
  { code: `Digit2`, shift: true, ctrl: false, value: `@` },
  { code: `KeyA`, shift: true, ctrl: false, value: `A` },
  { code: `KeyB`, shift: true, ctrl: false, value: `B` },
  { code: `KeyC`, shift: true, ctrl: false, value: `C` },
  { code: `KeyD`, shift: true, ctrl: false, value: `D` },
  { code: `KeyE`, shift: true, ctrl: false, value: `E` },
  { code: `KeyF`, shift: true, ctrl: false, value: `F` },
  { code: `KeyG`, shift: true, ctrl: false, value: `G` },
  { code: `KeyH`, shift: true, ctrl: false, value: `H` },
  { code: `KeyI`, shift: true, ctrl: false, value: `I` },
  { code: `KeyJ`, shift: true, ctrl: false, value: `J` },
  { code: `KeyK`, shift: true, ctrl: false, value: `K` },
  { code: `KeyL`, shift: true, ctrl: false, value: `L` },
  { code: `KeyM`, shift: true, ctrl: false, value: `M` },
  { code: `KeyN`, shift: true, ctrl: false, value: `N` },
  { code: `KeyO`, shift: true, ctrl: false, value: `O` },
  { code: `KeyP`, shift: true, ctrl: false, value: `P` },
  { code: `KeyQ`, shift: true, ctrl: false, value: `Q` },
  { code: `KeyR`, shift: true, ctrl: false, value: `R` },
  { code: `KeyS`, shift: true, ctrl: false, value: `S` },
  { code: `KeyT`, shift: true, ctrl: false, value: `T` },
  { code: `KeyU`, shift: true, ctrl: false, value: `U` },
  { code: `KeyV`, shift: true, ctrl: false, value: `V` },
  { code: `KeyW`, shift: true, ctrl: false, value: `W` },
  { code: `KeyX`, shift: true, ctrl: false, value: `X` },
  { code: `KeyY`, shift: true, ctrl: false, value: `Y` },
  { code: `KeyZ`, shift: true, ctrl: false, value: `Z` },
  { code: `BracketLeft`, shift: false, ctrl: false, value: `[` },
  { code: `Backslash`, shift: false, ctrl: false, value: `\\` },
  { code: `BracketRight`, shift: false, ctrl: false, value: `]` },
  { code: `Digit6`, shift: true, ctrl: false, value: `^` },
  { code: `Minus`, shift: true, ctrl: false, value: `_` },
  { code: `Backquote`, shift: false, ctrl: false, value: `\`` },
  { code: `KeyA`, shift: false, ctrl: false, value: `a` },
  { code: `KeyB`, shift: false, ctrl: false, value: `b` },
  { code: `KeyC`, shift: false, ctrl: false, value: `c` },
  { code: `KeyD`, shift: false, ctrl: false, value: `d` },
  { code: `KeyE`, shift: false, ctrl: false, value: `e` },
  { code: `KeyF`, shift: false, ctrl: false, value: `f` },
  { code: `KeyG`, shift: false, ctrl: false, value: `g` },
  { code: `KeyH`, shift: false, ctrl: false, value: `h` },
  { code: `KeyI`, shift: false, ctrl: false, value: `i` },
  { code: `KeyJ`, shift: false, ctrl: false, value: `j` },
  { code: `KeyK`, shift: false, ctrl: false, value: `k` },
  { code: `KeyL`, shift: false, ctrl: false, value: `l` },
  { code: `KeyM`, shift: false, ctrl: false, value: `m` },
  { code: `KeyN`, shift: false, ctrl: false, value: `n` },
  { code: `KeyO`, shift: false, ctrl: false, value: `o` },
  { code: `KeyP`, shift: false, ctrl: false, value: `p` },
  { code: `KeyQ`, shift: false, ctrl: false, value: `q` },
  { code: `KeyR`, shift: false, ctrl: false, value: `r` },
  { code: `KeyS`, shift: false, ctrl: false, value: `s` },
  { code: `KeyT`, shift: false, ctrl: false, value: `t` },
  { code: `KeyU`, shift: false, ctrl: false, value: `u` },
  { code: `KeyV`, shift: false, ctrl: false, value: `v` },
  { code: `KeyW`, shift: false, ctrl: false, value: `w` },
  { code: `KeyX`, shift: false, ctrl: false, value: `x` },
  { code: `KeyY`, shift: false, ctrl: false, value: `y` },
  { code: `KeyZ`, shift: false, ctrl: false, value: `z` },
  { code: `BracketLeft`, shift: true, ctrl: false, value: `{` },
  { code: `Backslash`, shift: true, ctrl: false, value: `|` },
  { code: `BracketRight`, shift: true, ctrl: false, value: `}` },
  { code: `Backquote`, shift: true, ctrl: false, value: `~` },
  { code: `Delete`, shift: false, ctrl: false, value: `\x7f` }, // DEL
];

// Manually converting keyboard key code to ASCII symbols to prevent incorrect processing of barcodes in different keyboard layouts.
export function getEnteredSymbol(e: KeyboardEvent): string {
  const keyMatch = keysMap.find(
    (km) =>
      km.shift === e.shiftKey &&
      km.ctrl === e.ctrlKey &&
      km.code === (e.code as KeyCode)
  );

  const symbol = keyMatch?.value ?? ``;
  // console.log("e.key", e.key, "e.code", e.code, "symbol", symbol);
  return symbol;
}
