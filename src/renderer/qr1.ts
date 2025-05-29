import { useEffect, useState, useCallback } from "react";
import { getEnteredSymbol } from "./keysToSymbolsMapper";

type BinaryScannerHook = {
  isScanning: boolean;
};

const SCAN_THRESHOLD = 50; // Максимальная задержка между символами (в мс)
const SCAN_COMPLETE_DELAY = 100; // Задержка для завершения ввода (в мс)

// let isScanning = false;
// let rawBytes: number[] = [];
// let lastKeyPressTime = 0;

export const useBinaryScanner = (onScan: (data: string) => void): BinaryScannerHook => {
  let isScanning = false;
  let rawBytes: number[] = [];
  let lastKeyPressTime = 0; // Время последнего нажатия клавиши
  let inputTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Игнорируем управляющие клавиши
      
      if (e.ctrlKey || e.metaKey) return;

      const char = getEnteredSymbol(e);
      const currentTime = Date.now();

      if (currentTime - lastKeyPressTime > SCAN_THRESHOLD) {
        // Если задержка больше порога, сбрасываем сканирование
        isScanning = false;
        rawBytes = [];
      }

      lastKeyPressTime = currentTime;

      // Таймер для завершения ввода
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }
      inputTimeout = setTimeout(() => {
        if (isScanning) {
          const text = new TextDecoder("utf-8").decode(new Uint8Array(rawBytes));
          onScan(text); // Вызываем переданный метод с результатом
          isScanning = false;
          rawBytes = [];
        }
      }, SCAN_COMPLETE_DELAY);

      // Начало сканирования (первый символ)
      if (!isScanning && char.length === 1) {
        isScanning = true;
        rawBytes = [char.charCodeAt(0)];
        return;
      }

      // Продолжение сканирования
      if (isScanning) {
        if (char.length === 1) {
          rawBytes.push(char.charCodeAt(0));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onScan]);

  return { isScanning };
};
