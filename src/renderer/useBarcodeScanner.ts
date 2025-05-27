import { useEffect, useRef } from "react";

function decodeByteCodesAsUtf8(input: string): string {
  const matches = input.match(/\d{4}/g);
  if (!matches) return "";

  // Преобразуем в байты (0–255), отбрасывая всё > 255
  const bytes = matches
    .map((codeStr) => parseInt(codeStr, 10))
    .filter((code) => code >= 0 && code <= 255);

  const uint8 = new Uint8Array(bytes);
  try {
    return new TextDecoder("utf-8").decode(uint8);
  } catch {
    return "";
  }
}

export const useAltScannerViaInput = (
  onScan: (decoded: string) => void,
  scanDelay = 50
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const bufferRef = useRef("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = () => {
      const value = input.value;
      bufferRef.current += value;
      input.value = ""; // очищаем поле после каждого символа

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const raw = bufferRef.current;
        bufferRef.current = "";

        if (raw.length >= 3) {
          const decoded = tryDecode(raw);
          console.log("✅ [SmartScan] Декодировано:", decoded);
          onScan(decoded);
        }
      }, scanDelay + 50);
    };

    input.addEventListener("input", handleInput);
    input.focus();

    return () => {
      input.removeEventListener("input", handleInput);
    };
  }, [onScan, scanDelay]);

  return inputRef;
};

function tryDecode(raw: string): string {
  const decoded = decodeByteCodesAsUtf8(raw);
  return extractPayload(sanitizeInput(decoded)) || raw;
}

function sanitizeInput(input: string): string {
  return input.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
}

function extractPayload(input: string): string {
  const match = input.match(/\u0002(.*?)\u0003/);
  return match ? match[1] : input;
}
