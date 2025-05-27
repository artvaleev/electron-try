import { useEffect } from "react";
import { KeyboardEventData } from "./useKeyLogger";
import { getEnteredSymbol } from "./keysToSymbolsMapper";

export const useBarcodeScanner = (
  onScan: (data: string, dataArr: KeyboardEventData[]) => void,
  scanDelay = 100
) => {
  useEffect(() => {
    let buffer: string[] = [];
    let dataBuffer: KeyboardEventData[] = [];
    let lastKeyTime = 0;
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastKeyTime;

      if (timeDiff > scanDelay) {
        buffer = [];
        dataBuffer = [];
      }

      lastKeyTime = now;

      buffer.push(getEnteredSymbol(e));

      clearTimeout(timer);
      timer = setTimeout(() => {
        if (buffer.length >= 3) {
          const raw = buffer.join("");
          const cleaned = sanitizeInput(raw);
          onScan(cleaned, dataBuffer);
        }
        buffer = [];
        dataBuffer = [];
      }, scanDelay);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onScan, scanDelay]);
};

// Удаляет непечатаемые символы (можно настроить под свои нужды)
function sanitizeInput(input: string): string {
  return input.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); // Убираем управляющие символы
}
