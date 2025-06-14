import { useEffect, useState, useCallback } from "react";

type BinaryScannerHook = {
  data: string | null;
  rawBytes: number[];
  error: string | null;
  reset: () => void;
  isScanning: boolean;
};

export const useBinaryScanner = (): BinaryScannerHook => {
  const [data, setData] = useState<string | null>(null);
  const [rawBytes, setRawBytes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const reset = useCallback(() => {
    setData(null);
    setRawBytes([]);
    setError(null);
    setIsScanning(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Игнорируем управляющие клавиши
      if (e.ctrlKey || e.metaKey) return;

      // Начало сканирования (первый символ)
      if (!isScanning && e.key.length === 1) {
        console.log("start");

        setIsScanning(true);
        setRawBytes([e.key.charCodeAt(0)]);
        return;
      }

      // Продолжение сканирования
      if (isScanning) {
        // Обычные символы
        if (e.key.length === 1) {
          setRawBytes((prev) => [...prev, e.key.charCodeAt(0)]);
        }

        // Enter - завершение сканирования
        if (e.code === "Enter") {
          try {
            const text = new TextDecoder("utf-8").decode(
              new Uint8Array(rawBytes) // Учитываем последний символ
            );
            setData(text);
          } catch (err) {
            setError("Decoding failed");
          }
          setIsScanning(false);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isScanning, rawBytes]);

  return { data, rawBytes, error, reset, isScanning };
};
