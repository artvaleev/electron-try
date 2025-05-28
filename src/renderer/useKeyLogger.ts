import { useEffect } from "react";
import { getEnteredSymbol } from "./keysToSymbolsMapper";

export const useKeyLogger = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const char = e.key;
      const code = char.charCodeAt(0);
      const hex = code.toString(16).padStart(4, "0");

      console.log(
        `AltKey: ${e.altKey} | Key: "${char}" | Char Code: ${code} | Unicode: \\u${hex} | e.code: ${e.code} | enteredSymbol: ${getEnteredSymbol(e)}`
      );
    };

    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, []);
};

export type KeyboardEventData = {
  key: string;
  code: string;
  hex: string;
  charCode: number;
};
export const keyboardEvent2Data = (e: KeyboardEvent): KeyboardEventData => {
  const char = e.key;
  const charCode = char.charCodeAt(0);
  const hex = charCode.toString(16).padStart(4, "0");

  return {
    key: e.key,
    code: e.code,
    charCode,
    hex,
  };
};
