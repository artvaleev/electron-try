import { useEffect } from "react";
import { getEnteredSymbol } from "./keysToSymbolsMapper";

const SCAN_THRESHOLD_MS = 50; // Максимальная задержка между символами (в мс)
const SCAN_COMPLETE_DELAY_MS = 50; // Задержка для завершения ввода (в мс)
const MIN_SCAN_LENGTH = 5; // Минимальная длина последовательности для сканера

let isScanning = false;
let rawString: string = "";
let rawBytes: number[] = [];
let lastKeyPressTime = 0;
let inputTimeout: NodeJS.Timeout | null = null;

export const useBinaryScanner = (onScan: (data: string) => void): void => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Игнорируем управляющие клавиши
      if (e.ctrlKey || e.metaKey) return;

      const char = getEnteredSymbol(e);
      const currentTime = Date.now();

      // Проверяем, является ли ввод быстрым (от сканера)
      if (currentTime - lastKeyPressTime > SCAN_THRESHOLD_MS) {
        // Если задержка больше порога, сбрасываем сканирование
        isScanning = false;
        rawString = '';
        rawBytes = [];
      }

      lastKeyPressTime = currentTime;

      // Таймер для завершения ввода
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }
      inputTimeout = setTimeout(() => {
        if (isScanning && rawString.length >= MIN_SCAN_LENGTH) {
          const text = new TextDecoder("utf-8").decode(new Uint8Array(rawBytes));
          console.log('text from bytes', text);
          
          onScan(rawString);
        }

        isScanning = false;
        rawString = '';
        rawBytes = [];
      }, SCAN_COMPLETE_DELAY_MS);

      // Начало сканирования (первый символ)
      if (!isScanning && char.length === 1) {
        isScanning = true;
        rawString = char;
        rawBytes = [char.charCodeAt(0)];
        return;
      }

      // Продолжение сканирования
      if (isScanning) {
        if (char.length === 1) {
          rawString += char;
          rawBytes.push(char.charCodeAt(0));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (inputTimeout) {
        clearTimeout(inputTimeout);
        inputTimeout = null;
      }
    };
  }, [onScan]);
};